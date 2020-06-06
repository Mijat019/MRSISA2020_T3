import { Model, INTEGER, DATE } from "sequelize";
import db from "./database";
import AppointmentTypes from "./AppointmentTypes";
import Rooms from "./Rooms";
import DoctorAt from "./DoctorAt";
import PriceLists from "./PriceLists";

class FreeAppointments extends Model {
  public id!: number;
  public priceListId!: number;
  public doctorId!: number;
  public roomId!: number;
  public start!: number;
  public duration!: number;
}

FreeAppointments.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    priceListId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    doctorId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    roomId: {
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
  },
  {
    timestamps: false,
    tableName: "free_appointments",
    version: true,
    sequelize: db,
  }
);

FreeAppointments.belongsTo(PriceLists, {
  as: "priceList",
  foreignKey: "priceListId",
});

FreeAppointments.belongsTo(Rooms, { as: "room", foreignKey: "roomId" });

FreeAppointments.belongsTo(DoctorAt, { as: "doctor", foreignKey: "doctorId" });

export default FreeAppointments;
