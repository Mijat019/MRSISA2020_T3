import db from "./database";
import { Model, STRING, INTEGER, Association } from "sequelize";
import Users from "./Users";

class Clinics extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
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
    sequelize: db,
    tableName: "clinics",
  }
);

export default Clinics;

export const clinicsSelect = [
  "id",
  "name",
  "street",
  "city",
  "streetNumber",
  "description",
];
