import { Model, INTEGER, DATE } from "sequelize";
import db from "./database";
import AppointmentTypes from "./AppointmentTypes";
import Rooms from "./Rooms";
import DoctorAt from "./DoctorAt";

class FreeAppointments extends Model {
  public id!: number;
  public appointmentTypeId!: number;
  public doctorId!: number;
  public roomId!: number;
  public start!: Date;
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

    appointmentTypeId: {
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
    tableName: "FreeAppointments",
    sequelize: db,
  }
);

FreeAppointments.belongsTo(AppointmentTypes, {
  as: "appointmentType",
  foreignKey: "appointmentTypeId",
});

FreeAppointments.belongsTo(Rooms, { as: "room", foreignKey: "roomId" });

FreeAppointments.belongsTo(DoctorAt, { as: "doctor", foreignKey: "doctorId" });

export default FreeAppointments;
