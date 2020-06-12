import Users, { usersSelect } from '../models/Users';
import UserRole from '../models/UserRole';
import UsersService from './UsersService';
import DoctorAt from '../models/DoctorAt';
import Clinics from '../models/Clinics';
import AdminAt from '../models/AdminAt';
import DoctorSpec from '../models/DoctorSpec';
import AppointmentTypes from '../models/AppointmentTypes';
import RatingsService from './RatingsService';
import FreeAppointments from '../models/FreeAppointments';
import ConfirmedAppointments from '../models/ConfirmedAppointments';
import moment from 'moment';
import { Op } from 'sequelize';

class DoctorsService {
  public async getAll(): Promise<any> {
    const doctors = (await DoctorAt.findAll({
      include: [
        { model: Users, attributes: usersSelect, as: 'user' },
        { model: Clinics, attributes: ['name'], as: 'clinic' },
        {
          model: DoctorSpec,
          attributes: ['id'],
          as: 'spec',
          include: [
            {
              model: AppointmentTypes,
              attributes: ['id', 'name'],
              as: 'appoType',
            },
          ],
        },
      ],
    })) as any;

    for (let doctor of doctors) {
      doctor.dataValues.rating = await RatingsService.getRatingForDoctor(
        doctor.userId
      );
    }

    return doctors;
  }

  public async getByClinicId(clinicId: number, userId: number): Promise<any> {
    // Does the user id match the admin of this clinic?
    const adminAt = await AdminAt.findOne({ where: { userId, clinicId } });
    // if (adminAt == null) {
    //   // Given user is NOT an admin of this clinic or either of them don't exist
    //   throw "Given user " + _userId + " is not an admin of clinic " + _clinicId;
    // }

    const doctors = (await DoctorAt.findAll({
      where: { clinicId },
      include: [
        { model: Users, attributes: usersSelect, as: 'user' },
        { model: Clinics, attributes: ['name'], as: 'clinic' },
        {
          model: DoctorSpec,
          attributes: ['id'],
          as: 'spec',
          include: [
            {
              model: AppointmentTypes,
              attributes: ['id', 'name'],
              as: 'appoType',
            },
          ],
        },
      ],
    })) as any;

    for (let doctor of doctors) {
      doctor.dataValues.rating = await RatingsService.getRatingForDoctor(
        doctor.userId
      );
    }
    return doctors;
  }

  /**
   * Gets all doctors for appo type and their available hours for appointment
   */
  public async getAllForScheduling(
    clinicId: any,
    appointmentTypeId: any,
    date: any
  ) {
    const doctors = (await DoctorAt.findAll({
      include: [
        { model: Users, attributes: usersSelect, as: 'user', required: true },
        {
          model: Clinics,
          attributes: [],
          where: { id: clinicId },
          as: 'clinic',
          required: true,
        },
        {
          model: DoctorSpec,
          attributes: [],
          as: 'spec',
          where: { appointmentTypeId },
          required: true,
        },
      ],
    })) as any;

    // get average rating of clinic
    for (let doctor of doctors) {
      doctor.dataValues.rating = await RatingsService.getRatingForDoctor(
        doctor.userId
      );
    }

    return doctors;
  }

  public async add(doctorPayload: any, clinicId: number): Promise<any> {
    // Create user
    const { id: userId } = await UsersService.createEmployee(
      doctorPayload,
      UserRole.DOCTOR
    );

    // Link with clinic
    await DoctorAt.create({ userId, clinicId });
    const doctor = await DoctorAt.findByPk(userId, {
      include: [
        { model: Users, attributes: usersSelect, as: 'user' },
        { model: Clinics, attributes: ['name'], as: 'clinic' },
      ],
    });
    return doctor;
  }

  public async addSpecialization(userId: number, appointmentTypeId: number) {
    await DoctorSpec.create({
      userId,
      appointmentTypeId,
    });

    const spec: any = await DoctorSpec.findOne({
      where: { userId, appointmentTypeId },
      include: [
        { model: AppointmentTypes, attributes: ['id', 'name'], as: 'appoType' },
      ],
      attributes: ['id'],
    });

    return spec;
  }

  public async deleteSpecialization(userId: number, appointmentTypeId: number) {
    await DoctorSpec.destroy({
      where: { userId, appointmentTypeId },
    });
  }

  private async hasFreeAppos(doctorId: number) {
    const freeAppos = await FreeAppointments.findAll({ where: { doctorId } });
    return freeAppos.length > 0;
  }

  private async hasConfirmedAppos(doctorId: number) {
    const confirmedAppos = await ConfirmedAppointments.findAll({
      where: { doctorId },
    });
    return confirmedAppos.length > 0;
  }

  /** Returns a list of all available times for doctor given the date */
  public async getAvailableTimes(doctorId: any, date: any) {
    
    date = moment.unix(date);

    // generate all possible times
    let allTimes = ['09:00', '09:30'];
    for (let i = 10; i < 17; i++) {
      allTimes.push(i + ':' + '00');
      allTimes.push(i + ':' + '30');
    }

    // set time bounds
    // (min = date at 9AM, max = date at 5PM)
    const minTime = date.clone().set({ hour: 9, minute: 0, second: 0 });
    const maxTime = date.clone().set({ hour: 17, minute: 0, second: 0 });

    //get all free Appos
    const freeApps = await FreeAppointments.findAll({
      where: {
        doctorId,
        start: {
          [Op.between]: [minTime.unix(), maxTime.unix()],
        },
      },
    });

    // delete busy times
    this.parseApposAndDeleteTimes(freeApps, allTimes);

    //get all conf appos
    const confApps = await ConfirmedAppointments.findAll({
      where: {
        doctorId,
        start: {
          [Op.between]: [minTime.unix(), maxTime.unix()],
        },
      },
    });

    // delete busy times
    this.parseApposAndDeleteTimes(confApps, allTimes);

    console.log(allTimes);
    return allTimes;
  }

  public parseApposAndDeleteTimes(appos: any, times: any): any {
    for (let app of appos) {
      const formatted = moment.unix(app.start).format('HH:mm');
      const idx = times.indexOf(formatted);
      if (idx >= 0) times.splice(idx, 1);
    }
  }

  public async delete(doctorId: number) {
    // Does the doctor have allocated Free appointments?
    
    // if (await this.hasFreeAppos(doctorId)) {
    //   throw "Can't delete doctor: they have free appointments allocated to them!";
    // }

    // // Does the doctor have Confirmed appointments?
    // if (await this.hasConfirmedAppos(doctorId)) {
    //   throw "Can't delete doctor: they have confirmed appointments!";
    // }
    // Doctor is free and can be deleted
    await Users.destroy({ where: { id: doctorId } });
    await DoctorAt.destroy({ where: { userId: doctorId } });
  }
}

export default new DoctorsService();
