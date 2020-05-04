import { Model, INTEGER, DATE } from "sequelize";
import db from "./database";
import AppointmentTypes from "./AppointmentTypes";
import Rooms from "./Rooms";
import DoctorAt from "./DoctorAt";

class FreeAppointments extends Model {
  public id!: number;
  public AppointmentTypeId!: number;
  public DoctorAtUserId!: number;
  public RoomId!: number;
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

    AppointmentTypeId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    DoctorAtUserId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    RoomId: {
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

// id from appointmentTypes is propagated to FreeAppointments
AppointmentTypes.hasMany(FreeAppointments);
FreeAppointments.belongsTo(AppointmentTypes);

Rooms.hasMany(FreeAppointments);
FreeAppointments.belongsTo(Rooms);

DoctorAt.hasMany(FreeAppointments);
FreeAppointments.belongsTo(DoctorAt);

export default FreeAppointments;
