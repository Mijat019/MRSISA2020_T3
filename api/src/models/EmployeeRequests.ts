import { Model, STRING, INTEGER } from "sequelize";
import UserRole from "./UserRole";
import db from "./database";
import Clinics from "./Clinics";

class EmployeeRequests extends Model {
  public id!: number;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public jmbg!: string;
  public city!: string;
  public country!: string;
  public address!: string;
  public phoneNumber!: string;
  public role!: UserRole;
  public clinicId!: number;
}

EmployeeRequests.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: STRING,
      unique: true,
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
    accountStatus: {
      type: INTEGER,
      defaultValue: 0,
    },
    role: {
      type: INTEGER,
      allowNull: false,
    },
    clinicId: {
      type: INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "employeeRequests",
  }
);
EmployeeRequests.hasOne(Clinics);

export default EmployeeRequests;
