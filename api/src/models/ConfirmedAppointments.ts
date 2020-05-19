import {
  Model,
  INTEGER,
  DATE,
  Options,
  ModelAttributeColumnOptions,
} from "sequelize";
import db from "./database";
import Rooms from "./Rooms";
import DoctorAt from "./DoctorAt";
import PriceLists from "./PriceLists";
import PatientMedicalRecord from "./PatientMedicalRecord";

class ConfirmedAppointments extends Model {
  public id!: number;
  public priceListId!: number;
  public doctorId!: number;
  public patientId!: number;
  public roomId!: number;
  public start!: Date;
  public duration!: number;
}

ConfirmedAppointments.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    priceListId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },

    doctorId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },

    patientId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },

    roomId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },

    start: {
      type: DATE,
      allowNull: false,
    },

    duration: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "ConfirmedAppointments",
    sequelize: db,
  }
);

ConfirmedAppointments.belongsTo(PriceLists, {
  as: "priceList",
  foreignKey: "priceListId",
});

ConfirmedAppointments.belongsTo(PatientMedicalRecord, {
  as: "patient",
  foreignKey: "patientId",
});

ConfirmedAppointments.belongsTo(Rooms, { as: "room", foreignKey: "roomId" });

ConfirmedAppointments.belongsTo(DoctorAt, {
  as: "doctor",
  foreignKey: "doctorId",
});

export default ConfirmedAppointments;
