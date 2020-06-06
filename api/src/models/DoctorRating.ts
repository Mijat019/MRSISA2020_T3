import db from './database';
import { Model, INTEGER, DOUBLE, STRING } from 'sequelize';
import Users from './Users';
import { number } from 'joi';

class DoctorRating extends Model {
  public id!: number;
  public patientId!: number;
  public doctorId!: number;
  public communicationRating!: number;
  public expertiseRating!: number;
  public timeRating!: number;
  public averageRating!: number;
  public comment!: string;
}

DoctorRating.init(
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
    doctorId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },
    communicationRating: {
      type: DOUBLE,
      allowNull: false,
    },
    expertiseRating: {
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
    tableName: 'doctor_rating',
    version: true,
    indexes: [{ unique: true, fields: ['patientId', 'doctorId'] }],
  }
);

DoctorRating.belongsTo(Users, { as: 'patient', foreignKey: 'patientId' });

DoctorRating.belongsTo(Users, { as: 'doctor', foreignKey: 'doctorId' });

export default DoctorRating;
