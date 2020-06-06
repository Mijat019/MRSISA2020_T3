import AppointmentReports from '../models/AppointmentReports';
import { IncludeOptions } from 'sequelize/types';
import PatientMedicalRecord from '../models/PatientMedicalRecord';
import ConfirmedAppointments from '../models/ConfirmedAppointments';
import Diagnosis from '../models/Diagnosis';
import Prescription from '../models/Prescriptions';
import PriceLists from '../models/PriceLists';
import AppointmentTypes from '../models/AppointmentTypes';
import DoctorAt from '../models/DoctorAt';
import Users, { usersSelect } from '../models/Users';
import Clinics, { clinicsSelect } from '../models/Clinics';
import confirmedAppointmentService from './ConfirmedAppointmentService';
import Drugs from '../models/Drugs';

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
          {
            model: Clinics,
            as: 'clinic',
            attributes: clinicsSelect,
            required: true,
          },
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

  public async getAllForApproving(clinicId: string) {
    const reports = await AppointmentReports.findAll({
      where: { clinicId, prescriptionsApproved: 0 },
      attributes: ['id'],
      include: [
        {
          model: PatientMedicalRecord,
          as: 'patientMedicalRecord',
          attributes: ['userId'],
          required: true,
          include: [
            {
              model: Users,
              as: 'user',
              attributes: ['firstName', 'lastName'],
              required: true,
            },
          ],
        },
        {
          model: Prescription,
          as: 'prescriptions',
          attributes: ['id'],
          include: [{ model: Drugs, as: 'drug', attributes: ['name'] }],
        },
      ],
    });
    return reports;
  }

  public async add(appointmentReportPayload: any) {
    const { id, confirmedAppointmentId } = await AppointmentReports.create(
      appointmentReportPayload
    );

    await this.createPrescriptionsFromReport(id, appointmentReportPayload);

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
    appointmentReportId: any,
    appointmentReportPayload: any
  ) => {
    const { prescriptions, clinicId } = appointmentReportPayload;
    if (prescriptions.length === 0) {
      await this.update(appointmentReportId, {
        prescriptionsApproved: true,
      });
      return;
    }

    for (let prescription of prescriptions) {
      const { id: drugId } = prescription;
      await Prescription.create({ drugId, appointmentReportId, clinicId });
    }
  };

  public async update(id: any, appointmentReportUpdate: any) {
    await AppointmentReports.update(appointmentReportUpdate, { where: { id } });
  }

  public async approvePrescriptions(
    nurseId: string,
    appointmentReportId: string,
    prescriptionIds: any
  ) {
    await this.update(appointmentReportId, { prescriptionsApproved: true });
    for (let id of prescriptionIds) {
      await Prescription.update({ approved: true, nurseId }, { where: { id } });
    }
  }
}

export default new AppointmentReportService();
