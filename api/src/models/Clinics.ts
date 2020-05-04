import db from "./database";
import { Model, STRING, INTEGER, Association } from "sequelize";
import Users from "./Users";
import AdminOf from "./AdminAt";

class Clinics extends Model {
  public id!: number;
  public name!: string;
  public city!: string;
  public street!: string;
  public streetNumber!: string;
  public description!: string;
}

Clinics.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    city: {
      type: STRING,
      allowNull: false,
    },
    street: {
      type: STRING,
      allowNull: false,
    },
    streetNumber: {
      type: STRING,
      allowNull: false,
    },
    description: STRING,
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "clinics",
  }
);

export default Clinics;

export const clinicsSelectForAdmins = ["name"];
export const clinicsSelect = [
  "id",
  "name",
  "street",
  "city",
  "streetNumber",
  "description",
];
