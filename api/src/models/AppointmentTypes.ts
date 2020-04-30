import { Model, INTEGER, DOUBLE, STRING } from "sequelize";
import db from "./database";

class AppointmentTypes extends Model {
  public id!: number;
  public price!: number;
  public name!: string;
}

AppointmentTypes.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    price: {
      type: DOUBLE,
      allowNull: false,
    },

    name: {
      type: STRING,
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
