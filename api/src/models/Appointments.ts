import { Model, INTEGER, DATE } from "sequelize";
import db from "./database";
import AppointmentTypes from "./AppointmentTypes";
import Rooms from "./Rooms";
import DoctorAt from "./DoctorAt";

class Appointments extends Model {
  public id!: number;
  public AppointmentTypeId!: number;
  public DoctorAtUserId!: number;
  public PatientMedicalRecordId!: number;
  public RoomId!: number;
  public start!: Date;
  public duration!: number;
}

Appointments.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
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

    PatientMedicalRecordId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: true,
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
    tableName: "appointments",
    sequelize: db,
  }
);

// id from appointmentTypes is propagated to appointments
AppointmentTypes.hasMany(Appointments);
Appointments.belongsTo(AppointmentTypes);

Rooms.hasMany(Appointments);
Appointments.belongsTo(Rooms);

DoctorAt.hasMany(Appointments);
Appointments.belongsTo(DoctorAt);

export default Appointments;
