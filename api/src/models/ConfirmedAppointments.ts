import {
  Model,
  INTEGER,
  DATE,
  ModelAttributeColumnOptions,
  BOOLEAN,
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
  public start!: number;
  public duration!: number;
  public finished!: boolean;
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
      type: INTEGER,
      allowNull: false,
    },

    duration: {
      type: INTEGER,
      allowNull: false,
    },

    finished: {
      type: BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
    tableName: "confirmed_appointments",
    sequelize: db,
    version: true,
    indexes: [{ unique: false, fields: ["finished"] }],
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
