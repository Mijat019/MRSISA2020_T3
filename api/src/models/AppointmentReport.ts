import { Model, INTEGER, DATE, STRING } from "sequelize";
import sequelize from "./database";
import PatientMedicalRecord from "./PatientMedicalRecord";
import ConfirmedAppointments from "./ConfirmedAppointments";
import Diagnosis from "./Diagnosis";

class AppointmentReport extends Model {
  public id!: number;
  public patientMedicalRecordId!: number;
  public confirmedAppointmentId!: number;
  public diagnosisId!: number;
  public createdAt!: Date;
  public notes!: string;
}

AppointmentReport.init(
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
      allowNull: false,
    },

    createdAt: {
      type: DATE,
      defaultValue: Date.now,
    },

    notes: {
      type: STRING,
      allowNull: true,
    },
  },
  { sequelize, tableName: "appointmentReport", timestamps: false }
);

AppointmentReport.belongsTo(PatientMedicalRecord, {
  as: "patientMedicalRecord",
  foreignKey: "patientMedicalRecordId",
});
AppointmentReport.belongsTo(ConfirmedAppointments, {
  as: "confirmedAppointment",
  foreignKey: "confirmedAppointmentId",
});
AppointmentReport.belongsTo(Diagnosis, {
  as: "diagnosis",
  foreignKey: "diagnosisId",
});

export default AppointmentReport;
