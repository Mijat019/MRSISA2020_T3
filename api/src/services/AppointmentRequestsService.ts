import AppointmentRequests from "../models/AppointmentRequests";
import DoctorAt from "../models/DoctorAt";
import Users, { usersSelect } from "../models/Users";
import AppointmentTypes from "../models/AppointmentTypes";
import PriceLists from "../models/PriceLists";
import PatientMedicalRecord from "../models/PatientMedicalRecord";

import EmailService from "./EmailService";
import FreeAppointmentService from "./FreeAppointmentService";
import ConfirmedAppointmentService from "./ConfirmedAppointmentService";
import config from "../config";

class AppointmentRequestsService {
  private include = [
    {
      model: DoctorAt,
      as: "doctor",
      required: true,
      include: [
        { model: Users, as: "user", attributes: usersSelect, required: true },
      ],
    },
    {
      model: PriceLists,
      as: "priceList",
      required: true,
      include: [
        { model: AppointmentTypes, as: "appointmentType", required: true },
      ],
    },
    {
      model: PatientMedicalRecord,
      as: "patientMedicalRecord",
      required: true,
      include: [
        { model: Users, as: "user", attributes: usersSelect, required: true },
      ],
    },
  ];

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

    // check if there are conflicts
    // with existing appos
    await FreeAppointmentService.checkForConflicts(requestPayload);

    // add requested appo to confirmed
    const { id } = requestPayload;
    delete requestPayload.id;
    await ConfirmedAppointmentService.add(requestPayload);

    // now you can delete it from requests
    await this.delete(id);

    // now send mail to notify
    const patient = requestPayload.patientMedicalRecord.user;
    const emailText = `Dear ${patient.firstName + " " + patient.lastName},
        \n\nYour Covid clinic appointment request has been approved!\n`;
    console.log(emailText);
    EmailService.send({
      from: config.mail,
      to: patient.email,
      subject: "Covid Clinic Appointment request",
      text: emailText,
    });
  }

  public async reject(requestPayload: any): Promise<any> {
    // delete from requests since it's rejected
    await this.delete(requestPayload.id);

    // now send mail to notify
    const patient = requestPayload.patientMedicalRecord.user;
    let emailText = `Dear ${patient.firstName + " " + patient.lastName},
        \n\nYour Covid clinic appointment request has been rejected because ${
          requestPayload.reason
        }!\n`;
    console.log(emailText);
    EmailService.send({
      from: config.mail,
      to: patient.email,
      subject: "Covid Clinic Appointment request",
      text: emailText,
    });
  }

  public async add(requestPayload: any): Promise<any> {
    const appointmentRequest = await AppointmentRequests.create(requestPayload);
    return appointmentRequest;
  }

  public async update(id: number, requestPayload: any): Promise<any> {
    await AppointmentRequests.update(requestPayload, {
      where: { id },
    });

    const updatedAppointmentRequest = await AppointmentRequests.findByPk(id);
    return updatedAppointmentRequest;
  }

  public async delete(id: any) {
    await AppointmentRequests.destroy({ where: { id: id } });
  }
}

export default new AppointmentRequestsService();
