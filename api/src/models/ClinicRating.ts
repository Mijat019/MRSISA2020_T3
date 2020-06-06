import db from './database';
import { Model, INTEGER, DOUBLE, STRING } from 'sequelize';
import Users from './Users';
import Clinics from './Clinics';
import { number } from 'joi';

class ClinicRating extends Model {
  public id!: number;
  public patientId!: number;
  public clinicId!: number;
  public communicationRating!: number;
  public expertiseRating!: number;
  public timeRating!: number;
  public averageRating!: number;
  public comment!: string;
}

ClinicRating.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    patientId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },
    clinicId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },
    serviceRating: {
      type: DOUBLE,
      allowNull: false,
    },
    cleanlinessRating: {
      type: DOUBLE,
      allowNull: false,
    },
    timeRating: {
      type: DOUBLE,
      allowNull: false,
    },
    averageRating: {
      type: DOUBLE,
      allowNull: false,
    },
    comment: {
      type: STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: 'clinic_rating',
    version: true,
    indexes: [{ unique: true, fields: ['patientId', 'clinicId'] }],
  }
);

ClinicRating.belongsTo(Users, { as: 'patient', foreignKey: 'patientId' });

ClinicRating.belongsTo(Clinics, { as: 'clinic', foreignKey: 'clinicId' });

export default ClinicRating;
