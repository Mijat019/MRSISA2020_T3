import AppointmentRequests from '../models/AppointmentRequests';
import { Op } from 'sequelize';
import DoctorAt from '../models/DoctorAt';
import Users, { usersSelect } from '../models/Users';
import AppointmentTypes from '../models/AppointmentTypes';
import PriceLists from '../models/PriceLists';
import PatientMedicalRecord from '../models/PatientMedicalRecord';
import ConfirmedAppointments from '../models/ConfirmedAppointments';
import EmailService from './EmailService';
import RoomsService from './RoomsService';
import FreeAppointmentService from './FreeAppointmentService';
import ConfirmedAppointmentService from './ConfirmedAppointmentService';
import config from '../config';
import { request } from 'http';
import scheduler from 'node-schedule';
import sequelize from './../models/database';
import DoctorsService from './DoctorsService';
import moment from 'moment';

class AppointmentRequestsService {
  private include = [
    {
      model: DoctorAt,
      as: 'doctor',
      required: true,
      include: [
        { model: Users, as: 'user', attributes: usersSelect, required: true },
      ],
    },
    {
      model: PriceLists,
      as: 'priceList',
      required: true,
      include: [
        { model: AppointmentTypes, as: 'appointmentType', required: true },
      ],
    },
    {
      model: PatientMedicalRecord,
      as: 'patientMedicalRecord',
      required: true,
      include: [
        { model: Users, as: 'user', attributes: usersSelect, required: true },
      ],
    },
  ];

  // run at 4am when nobody is working
  private automaticScheduler = scheduler.scheduleJob(
    { second: 0, minute: 0, hour: 4 },
    () => {
      this.automaticResponse();
    }
  );

  public async getAll(): Promise<any> {
    const appointmentRequest = await AppointmentRequests.findAll({});
    return appointmentRequest;
  }

  public async getAllForClinic(clinicId: any): Promise<any> {
    const appointmentRequest = await AppointmentRequests.findAll({
      where: { clinicId },
      include: this.include,
    });
    return appointmentRequest;
  }

  public async confirm(requestPayload: any): Promise<any> {
    requestPayload.patientId = requestPayload.patientMedicalRecord.userId;
    const { id } = requestPayload;
    delete requestPayload.id;

    try {
      return sequelize.transaction(async (t) => {
        await ConfirmedAppointments.create(requestPayload, {
          transaction: t,
        });
        const result = await AppointmentRequests.destroy({
          where: { id: id },
          transaction: t,
        });

        // if deleted 0 rows it means that
        // request has already been approved or denied
        if (result == 0) throw new Error('Requested already approved or rejected by another admin!');

        // now send mail to notify
        await EmailService.sendAppointmentRequestAcceptedMail(requestPayload);
      });
    } catch (error) {
      // notify user of error and rollback
      throw new Error(error);
    }
  }

  public async reject(requestPayload: any): Promise<any> {
    // delete from requests since it's rejected
    const result = await this.delete(requestPayload.id);
    if (result == 0)
      throw new Error(
        'Requested already approved or rejected by another admin!'
      );

    console.log(requestPayload.start);

    // now send mail to notify
    const patient = requestPayload.patientMedicalRecord.user;
    let emailText = `Dear ${patient.firstName + ' ' + patient.lastName},
        \n\nYour Covid clinic appointment request has been rejected because ${
          requestPayload.reason
        }!\n`;

    console.log(emailText);
    EmailService.send({
      from: config.mail,
      to: patient.email,
      subject: 'Covid Clinic Appointment request',
      text: emailText,
    });
  }

  /** Automatically responds to appointment requests */
  public async automaticResponse(): Promise<any> {
    const now = Date.now();
    const day_length = 24 * 60 * 60 * 1000; // 24 hours in miliseconds

    // get all requests made 24hr ago
    const appointmentRequests = await AppointmentRequests.findAll({
      where: {
        createdAt: {
          [Op.lte]: now - day_length,
        },
      },
      include: this.include,
    });

    for (const request of appointmentRequests) {
      const doctor = await DoctorAt.findByPk(request.doctorId);
      let date = moment(request.start).format('YYYY-MM-DD');
      if (doctor == null) return;
      const clinicId = doctor.clinicId;
      const doctorAvailableTimes = await DoctorsService.getAvailableTimes(
        request.doctorId,
        request.start
      );
      const roomsForClinic = await RoomsService.getAllForClinic(clinicId);

      const confirmedReq = {
        priceListId: request.priceListId,
        doctorId: request.doctorId,
        patientId: request.patientMedicalRecordId,
        start: request.start,
        duration: request.duration,
        roomId: '',
      };

      let success = false;

      //check for every room if it is available at that time
      for (const room of roomsForClinic) {
        confirmedReq.roomId = room.id;

        // try to schedule it with user's start time
        try {
          await ConfirmedAppointmentService.add(confirmedReq);
          await EmailService.automaticResponseAccept(confirmedReq);
          await this.delete(request.id);
          success = true;
          break;
        } catch {
          // error means room or doctor is occupied
          // so find time when both room and doctor are free
          const roomAvailableTimes = await RoomsService.getAvailableTimes(
            room.id,
            request.start
          );
          const intersection = roomAvailableTimes.filter(
            (value) => doctorAvailableTimes.indexOf(value) > 0
          );

          if (intersection.length > 0) {
            // set hours of new start of appo
            date = date + ' ' + intersection[0];
            confirmedReq.start = moment(date, 'YYYY-MM-DD HH:mm').unix();
            // try to schedule it now
            try {
              await ConfirmedAppointmentService.add(confirmedReq);
              // EmailService.sendAppointmentRequestAcceptedMail(request);
              await EmailService.automaticResponseAccept(confirmedReq);
              await this.delete(request.id);
              success = true;
              break;
            } catch {}
          }
        }
      }

      if (!success) {
        // if got here it means no room is available at the time so reject request
        const payload = request as any;
        payload.reason = 'No room is available.';
        await this.reject(payload);
      }
    }
  }

  public async add(requestPayload: any): Promise<any> {
    requestPayload.createdAt = Date.now();
    const appointmentRequest = await AppointmentRequests.create(requestPayload);
    return appointmentRequest;
  }

  public async update(id: number, requestPayload: any): Promise<any> {
    const { version } = (await AppointmentRequests.findByPk(id)) as any;
    if (version > requestPayload.version)
      throw new Error('Optimistic Lock error');

    requestPayload.version += 1;
    await AppointmentRequests.upsert(requestPayload);

    return await AppointmentRequests.findByPk(id);
  }

  public async delete(id: any) {
    return await AppointmentRequests.destroy({ where: { id: id } });
  }
}

export default new AppointmentRequestsService();
