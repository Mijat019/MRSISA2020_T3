import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from './database';
import Rooms from './Rooms';
import DoctorAt from './DoctorAt';
import PriceLists from './PriceLists';
import PatientMedicalRecord from './PatientMedicalRecord';
import Clinics from './Clinics';

class ConfirmedAppointments extends Model {
  public id!: number;
  public priceListId!: number;
  public doctorId!: number;
  public patientId!: number;
  public clinicId!: number;
  public roomId!: number;
  public start!: number;
  public duration!: number;
  public finished!: boolean;
  public room!: Rooms;
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

    clinicId: {
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
    tableName: 'confirmed_appointments',
    sequelize: db,
    version: true,
    indexes: [
      { unique: false, fields: ['finished'] },
      { unique: true, fields: ['doctorId', 'start'] },
      { unique: true, fields: ['patientId', 'start'] },
      { unique: true, fields: ['roomId', 'start'] },
    ],
  }
);

ConfirmedAppointments.belongsTo(PriceLists, {
  as: 'priceList',
  foreignKey: 'priceListId',
});

ConfirmedAppointments.belongsTo(PatientMedicalRecord, {
  as: 'patient',
  foreignKey: 'patientId',
});

ConfirmedAppointments.belongsTo(Rooms, { as: 'room', foreignKey: 'roomId' });
Rooms.hasMany(ConfirmedAppointments, {
  as: 'confirmedAppointments',
  foreignKey: 'roomId',
});

ConfirmedAppointments.belongsTo(DoctorAt, {
  as: 'doctor',
  foreignKey: 'doctorId',
});

Clinics.hasMany(ConfirmedAppointments, {
  as: 'clinics',
  foreignKey: 'clinicId',
});
ConfirmedAppointments.belongsTo(Clinics, {
  as: 'clinic',
  foreignKey: 'clinicId',
});

export default ConfirmedAppointments;
