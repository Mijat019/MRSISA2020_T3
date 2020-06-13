import { Model, INTEGER, DATE } from 'sequelize';
import db from './database';
import AppointmentTypes from './AppointmentTypes';
import Rooms from './Rooms';
import DoctorAt from './DoctorAt';
import PriceLists from './PriceLists';
import Clinics from './Clinics';

class FreeAppointments extends Model {
  public id!: number;
  public priceListId!: number;
  public doctorId!: number;
  public roomId!: number;
  public start!: number;
  public clinicId!: number;
  public duration!: number;
  public version!: number;
  public room!: Rooms;
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

    clinicId: {
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
    tableName: 'free_appointments',
    version: true,
    sequelize: db,
    indexes: [
      { unique: true, fields: ['doctorId', 'start'] },
      { unique: true, fields: ['roomId', 'start'] },
    ]
  }
);

FreeAppointments.belongsTo(PriceLists, {
  as: 'priceList',
  foreignKey: 'priceListId',
});

FreeAppointments.belongsTo(Rooms, { as: 'room', foreignKey: 'roomId' });
Rooms.hasMany(FreeAppointments, {
  as: 'freeAppointments',
  foreignKey: 'roomId',
});

FreeAppointments.belongsTo(DoctorAt, { as: 'doctor', foreignKey: 'doctorId' });

FreeAppointments.belongsTo(Clinics, { as: 'clinic', foreignKey: 'clinicId' });
Clinics.hasMany(FreeAppointments, {
  as: 'freeAppointments',
  foreignKey: 'clinicId',
});

export default FreeAppointments;
