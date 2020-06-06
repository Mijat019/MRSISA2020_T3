import { INTEGER, STRING, Model, Association } from "sequelize";
import db from "./database";
import AccountStatus from "./AccountStatus";
import UserRole from "./UserRole";
// import AdminOf from "./AdminOf";
import Clinics from "./Clinics";
import AdminOf from "./AdminAt";

class Users extends Model {
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
  public role!: UserRole;
  public accountStatus!: AccountStatus;
}

Users.init(
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
    accountStatus: {
      type: INTEGER,
      defaultValue: 0,
    },
    role: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "users",
    version: true,
  }
);

export default Users;

export const usersSelect = [
  "id",
  "email",
  "firstName",
  "lastName",
  "jmbg",
  "city",
  "country",
  "address",
  "phoneNumber",
  "accountStatus",
  "role",
];
