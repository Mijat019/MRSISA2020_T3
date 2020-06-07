import { Model, INTEGER } from 'sequelize';
import sequelize from './database';
import moment from 'moment';

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
  { sequelize, tableName: 'operation_requests', timestamps: false }
);

export default OperationRequests;
