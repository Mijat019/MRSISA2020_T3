import db from "./database";
import { Model, STRING, INTEGER } from "sequelize";
import PriceLists from "./PriceLists";
import sequelize from "sequelize";

class Clinics extends Model {
  public id!: number;
  public name!: string;
  public country!: string;
  public city!: string;
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
    country: {
      type: STRING,
      allowNull: false,
    },
    address: {
      type: STRING,
      allowNull: false,
    },
    description: STRING,
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "clinics",
    version: true,
  }
);

export default Clinics;

export const clinicsSelectForAdmins = ["name"];
export const clinicsSelect: any = [
  "id",
  "name",
  "country",
  "city",
  "address",
  "description",
];

export const clinicsSelectForRating: any = [
  "id",
  "name",
  "country",
  "city",
  "address",
  "description",
  [sequelize.fn('avg', sequelize.col('ratingList.averageRating')), 'rating']
];
