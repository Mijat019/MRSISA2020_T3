import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';
import sequelize from './database';
import moment from 'moment';
import PatientMedicalRecord from './PatientMedicalRecord';
import ConfirmedAppointments from './ConfirmedAppointments';
import Diagnosis from './Diagnosis';
import Clinics from './Clinics';
import Prescription from './Prescriptions';

class AppointmentReports extends Model {
  public id!: number;
  public patientMedicalRecordId!: number;
  public confirmedAppointmentId!: number;
  public diagnosisId!: number;
  public createdAt!: number;
  public notes!: string;
  public prescriptionsApproved!: boolean;
  public clinicId!: number;
}

AppointmentReports.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
    },

    patientMedicalRecordId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },

    confirmedAppointmentId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },

    diagnosisId: {
      type: INTEGER.UNSIGNED,
      allowNull: true,
    },

    createdAt: {
      type: INTEGER,
      defaultValue: () => moment().unix(),
    },

    prescriptionsApproved: {
      type: BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

    clinicId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },

    notes: {
      type: STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'appointment_report',
    timestamps: false,
    version: true,
    indexes: [{ fields: ['prescriptionsApproved'], unique: false }],
  }
);

AppointmentReports.belongsTo(PatientMedicalRecord, {
  as: 'patientMedicalRecord',
  foreignKey: 'patientMedicalRecordId',
});
AppointmentReports.belongsTo(ConfirmedAppointments, {
  as: 'confirmedAppointment',
  foreignKey: 'confirmedAppointmentId',
});
AppointmentReports.belongsTo(Diagnosis, {
  as: 'diagnosis',
  foreignKey: 'diagnosisId',
  onDelete: '',
});
AppointmentReports.belongsTo(Clinics, { as: 'clinic', foreignKey: 'clinicId' });
AppointmentReports.hasMany(Prescription, {
  as: 'prescriptions',
  foreignKey: 'appointmentReportId',
});
Prescription.belongsTo(AppointmentReports, {
  as: 'appointmentReport',
  foreignKey: 'appointmentReportId',
});

export default AppointmentReports;
