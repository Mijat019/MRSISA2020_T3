import { Model, INTEGER } from 'sequelize';
import sequelize from './database';
import moment from 'moment';
import Clinics from './Clinics';
import Rooms from './Rooms';
import DoctorAt from './DoctorAt';
import PatientMedicalRecord from './PatientMedicalRecord';

class Operations extends Model {
  public id!: number;
  public doctorId!: number;
  public clinicId!: number;
  public patientMedicalRecordId!: number;
  public roomId!: number;
  public start!: number;
  public duration!: number;
  public createdAt!: number;
}

Operations.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
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

    createdAt: {
      type: INTEGER,
      allowNull: true,
      defaultValue: () => moment().unix(),
    },
  },
  {
    sequelize,
    tableName: 'operations',
    timestamps: false,
    indexes: [
      { fields: ['doctorId'], unique: false },
      { fields: ['roomId', 'start'], unique: true },
      { fields: ['doctorId', 'start'], unique: true },
      { fields: ['patientMedicalRecordId', 'start'], unique: true },
    ],
  }
);

Rooms.hasMany(Operations, {
  as: 'operations',
  foreignKey: 'roomId',
});
Operations.belongsTo(Rooms, {
  as: 'room',
  foreignKey: 'roomId',
});

DoctorAt.hasMany(Operations, {
  as: 'operations',
  foreignKey: 'doctorId',
});
Operations.belongsTo(DoctorAt, { as: 'doctor', foreignKey: 'doctorId' });

Clinics.hasMany(Operations, {
  as: 'operations',
  foreignKey: 'clinicId',
});
Operations.belongsTo(Clinics, { as: 'clinic', foreignKey: 'clinicId' });

PatientMedicalRecord.hasMany(Operations, {
  as: 'operations',
  foreignKey: 'patientMedicalRecordId',
});
Operations.belongsTo(PatientMedicalRecord, {
  as: 'patientMedicalRecord',
  foreignKey: 'patientMedicalRecordId',
});

export default Operations;
