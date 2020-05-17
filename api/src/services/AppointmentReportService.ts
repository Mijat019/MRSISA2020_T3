import AppointmentReports from "../models/AppointmentReports";
import { IncludeOptions } from "sequelize/types";
import PatientMedicalRecord from "../models/PatientMedicalRecord";
import ConfirmedAppointments from "../models/ConfirmedAppointments";
import Diagnosis from "../models/Diagnosis";

const include: IncludeOptions[] = [
  { model: PatientMedicalRecord, as: "patientMedicalRecord", required: true },
  { model: ConfirmedAppointments, as: "confirmedAppointment", required: true },
  { model: Diagnosis, as: "diagnosis", required: true },
];

const attributes: string[] = ["id", "approved"];

class AppointmentReportService {
  public async getAllForPatient(patientMedicalRecordId: number) {
    const appointmentReports = await AppointmentReports.findAll({
      include,
      attributes,
    });
    return appointmentReports;
  }

  public async add(appointmentReportPayload: any) {
    const { id } = await AppointmentReports.create(appointmentReportPayload);
    const appointmentReport = await AppointmentReports.findByPk(id, {
      include,
      attributes,
    });
  }
}

export default new AppointmentReportService();
