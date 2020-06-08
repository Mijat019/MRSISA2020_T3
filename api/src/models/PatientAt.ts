import db from "./database";
import { Model, STRING, INTEGER, Association } from "sequelize";
import Users from "./Users";
import Clinics from "./Clinics";

class PatientAt extends Model {
  public userId!: number;
  public clinicId!: number;
}

PatientAt.init(
  {
    clinicId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "patient_at",
    version: true,
  }
);

PatientAt.belongsTo(Users, { as: "patient", foreignKey: "userId" });

export default PatientAt;
