import { Model, INTEGER, DOUBLE, STRING } from "sequelize";
import db from "./database";
import Clinics from "./Clinics";
import AppointmentTypes from "./AppointmentTypes";

class PriceLists extends Model {
  public id!: number;
  public price!: number;
  public clinicId!: number;
  public appointmentTypeId!: number;
}

PriceLists.init(
  {
    clinicId: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        unique: false,
        allowNull: false,
    },
    
    appointmentTypeId : {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        unique: false,
        allowNull: false,
    },

    id: {
      type: INTEGER.UNSIGNED,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },

    price : {
        type: DOUBLE,
        allowNull: false,
    }

  },
  {
    timestamps: false,
    tableName: "priceLists",
    sequelize: db,
  }
);

PriceLists.belongsTo(Clinics, { as: "clinic", foreignKey: "clinicId" });
PriceLists.belongsTo(AppointmentTypes, { as: "appointmentType", foreignKey: "appointmentTypeId" });


export default PriceLists;