import { Model, INTEGER, DATE, STRING } from 'sequelize';
import sequelize from './database';
import moment from 'moment';
import PatientMedicalRecord from './PatientMedicalRecord';
import ConfirmedAppointments from './ConfirmedAppointments';
import Diagnosis from './Diagnosis';

class AppointmentReports extends Model {
  public id!: number;
  public patientMedicalRecordId!: number;
  public confirmedAppointmentId!: number;
  public diagnosisId!: number;
  public createdAt!: number;
  public notes!: string;
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
});

export default AppointmentReports;
