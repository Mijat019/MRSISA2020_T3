import { Model, INTEGER, DOUBLE, STRING } from "sequelize";
import db from "./database";
import Clinics from "./Clinics";

class AppointmentTypes extends Model {
  public id!: number;
  public price!: number;
  public name!: string;
  public clinicId!: number;
}

AppointmentTypes.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    price: {
      type: DOUBLE,
      allowNull: false,
    },

    name: {
      type: STRING,
      unique: true,
      allowNull: false,
    },

    clinicId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "appointmentTypes",
    sequelize: db,
  }
);

AppointmentTypes.belongsTo(Clinics, { as: "clinic", foreignKey: "clinicId" });

export default AppointmentTypes;
