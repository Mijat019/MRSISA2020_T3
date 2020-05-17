import { Model, INTEGER, BOOLEAN } from "sequelize";
import sequelize from "./database";
import AppointmentReport from "./AppointmentReport";
import NurseAt from "./NurseAt";
import Drugs from "./Drugs";

const requiredUnsigned = {
  type: INTEGER.UNSIGNED,
  allowNull: false,
};

class Prescription extends Model {
  public id!: number;
  public appointmentReportId!: number;
  public drugId!: number;
  public nurseId!: number;
  public approved!: boolean;
}

Prescription.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
    },

    appointmentReportId: requiredUnsigned,

    drugId: requiredUnsigned,

    nurseId: {
      type: INTEGER.UNSIGNED,
      allowNull: true,
    },

    approved: {
      type: BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, tableName: "prescription", timestamps: false }
);

Prescription.belongsTo(AppointmentReport, {
  as: "appointmentReport",
  foreignKey: "appointmentReportId",
});
Prescription.belongsTo(NurseAt, { as: "nurse", foreignKey: "nurseId" });
Prescription.belongsTo(Drugs, { as: "drug", foreignKey: "drugsId" });

export default Prescription;
