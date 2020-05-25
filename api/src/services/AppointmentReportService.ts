import AppointmentReports from '../models/AppointmentReports';
import { IncludeOptions } from 'sequelize/types';
import PatientMedicalRecord from '../models/PatientMedicalRecord';
import ConfirmedAppointments from '../models/ConfirmedAppointments';
import Diagnosis from '../models/Diagnosis';
import Prescription from '../models/Prescription';
import PriceLists from '../models/PriceLists';
import AppointmentTypes from '../models/AppointmentTypes';
import DoctorAt from '../models/DoctorAt';
import Users, { usersSelect } from '../models/Users';
import confirmedAppointmentService from './ConfirmedAppointmentService';

const include: IncludeOptions[] = [
  { model: PatientMedicalRecord, as: 'patientMedicalRecord', required: true },
  {
    model: ConfirmedAppointments,
    as: 'confirmedAppointment',
    required: true,
    include: [
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
    ],
  },
  { model: Diagnosis, as: 'diagnosis', required: true },
];

const attributes: string[] = ['id', 'notes'];

class AppointmentReportService {
  public async getAllForPatient(patientMedicalRecordId: string) {
    const appointmentReports = await AppointmentReports.findAll({
      where: { patientMedicalRecordId },
      include,
      attributes,
    });
    return appointmentReports;
  }

  public async add(appointmentReportPayload: any) {
    const { id, confirmedAppointmentId } = await AppointmentReports.create(
      appointmentReportPayload
    );
    await this.createPrescriptionsFromReport(
      appointmentReportPayload.prescriptions,
      id
    );
    await confirmedAppointmentService.update(confirmedAppointmentId, {
      finished: true,
    });
    const appointmentReport = await AppointmentReports.findByPk(id, {
      include,
      attributes,
    });
    return appointmentReport;
  }

  private createPrescriptionsFromReport = async (
    prescriptions: any,
    appointmentReportId: number
  ) => {
    prescriptions.forEach(async (prescription: any) => {
      const { id: drugId } = prescription;
      await Prescription.create({ drugId, appointmentReportId });
    });
  };
}

export default new AppointmentReportService();
