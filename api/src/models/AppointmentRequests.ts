import { Model, INTEGER, DOUBLE, STRING, DATE, Op } from "sequelize";
import db from "./database";
import Users from "./Users";
import DoctorAt from "./DoctorAt";
import Clinics from "./Clinics";
import PriceLists from "./PriceLists";
import PatientMedicalRecord from "./PatientMedicalRecord";

class AppointmentRequests extends Model {
  public id!: number;
  public priceListId!: number;
  public clinicId!: number;
  public doctorId!: number;
  public patientMedicalRecordId!: number;
  public start!: number;
  public duration!: number;
  public createdAt!: number;
}

AppointmentRequests.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    priceListId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    clinicId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    patientMedicalRecordId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    doctorId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    start: {
      type: INTEGER,
      allowNull: false,
    },

    duration: {
      type: INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    tableName: "appointment_requests",
    sequelize: db,
    version: true,
  }
);

AppointmentRequests.belongsTo(PatientMedicalRecord, {
  as: "patientMedicalRecord",
  foreignKey: "patientMedicalRecordId",
});
AppointmentRequests.belongsTo(DoctorAt, {
  as: "doctor",
  foreignKey: "doctorId",
});
AppointmentRequests.belongsTo(PriceLists, {
  as: "priceList",
  foreignKey: "priceListId",
});
AppointmentRequests.belongsTo(Clinics, {
  as: "clinic",
  foreignKey: "clinicId",
});

export default AppointmentRequests;
