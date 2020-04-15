import db from "./database";
import { Model, STRING, INTEGER } from "sequelize";
import UserRole from './UserRole'
import RequestStatus from './RequestStatus'

class PatientRequest extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public jmbg!: string;
  public city!: string;
  public country!: string;
  public address!: string;
  public phoneNumber!: string;
  public requestStatus!: RequestStatus;
}

PatientRequest.init(
  {
    id: {
        type: INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      firstName: {
        type: STRING,
        allowNull: false,
      },
      lastName: {
        type: STRING,
        allowNull: false,
      },
      jmbg: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      city: {
        type: STRING,
        allowNull: false,
      },
      country: {
        type: STRING,
        allowNull: false,
      },
      address: {
        type: STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: STRING,
        allowNull: false,
      },
      requestStatus: {
        type: INTEGER,
        defaultValue: 0,
      },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "patient_requests",
  }
);

export default PatientRequest;
