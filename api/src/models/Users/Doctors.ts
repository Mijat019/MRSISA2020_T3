import { Model, STRING, INTEGER, DATE } from "sequelize";
import db from "../database";
import AccountStatus from "./AccountStatus";

class Doctors extends Model {
  public id!: number;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;
  public city!: string;
  /** Pending or Activated */
  public accountStatus!: AccountStatus;
  public country!: string;
  public phoneNumber!: string;
}

Doctors.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: STRING,
      allowNull: false
    },
    lastName: {
      type: STRING,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    },
    city: {
      type: STRING,
      allowNull: false
    },
    country: {
      type: STRING,
      allowNull: false
    },
    accountStatus: {
      type: INTEGER,
      allowNull: false
    },
    phoneNumber: {
      type: STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: db,
    tableName: "doctors"
  }
);

export default Doctors;
