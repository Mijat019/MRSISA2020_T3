import { Model, INTEGER, DOUBLE, STRING } from "sequelize";
import db from "./database";
import Clinics from "./Clinics";

class AppointmentTypes extends Model {
  public id!: number;
  public name!: string;
}

AppointmentTypes.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "appointmentTypes",
    sequelize: db,
  }
);


export default AppointmentTypes;

export const appTypesSelect = [
  "id",
  "name",
];
