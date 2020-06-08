import { Model, INTEGER } from 'sequelize';
import sequelize from './database';
import moment from 'moment';
import Clinics from './Clinics';
import DoctorAt from './DoctorAt';
import Rooms from './Rooms';
import PatientMedicalRecord from './PatientMedicalRecord';

class OperationRequests extends Model {
  public id!: number;
  public doctorId!: number;
  public clinicId!: number;
  public patientMedicalRecordId!: number;
  public start!: number;
  public duration!: number;
  public createdAt!: number;
}

OperationRequests.init(
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
    tableName: 'operation_requests',
    timestamps: false,
    indexes: [{ fields: ['clinicId'], unique: false }],
  }
);

Clinics.hasMany(OperationRequests, {
  as: 'operationRequests',
  foreignKey: 'clinicId',
});
OperationRequests.belongsTo(Clinics, { as: 'clinic', foreignKey: 'clinicId' });

DoctorAt.hasMany(OperationRequests, {
  as: 'operationRequests',
  foreignKey: 'doctorId',
});
OperationRequests.belongsTo(DoctorAt, { as: 'doctor', foreignKey: 'doctorId' });

PatientMedicalRecord.hasMany(OperationRequests, {
  as: 'operationRequests',
  foreignKey: 'patientMedicalRecordId',
});
OperationRequests.belongsTo(PatientMedicalRecord, {
  as: 'patientMedicalRecord',
  foreignKey: 'patientMedicalRecordId',
});

export default OperationRequests;
