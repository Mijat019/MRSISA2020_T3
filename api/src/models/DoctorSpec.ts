import db from "./database";
import { Model, INTEGER } from "sequelize";
import Users from "./Users";
import AppointmentTypes from "./AppointmentTypes";

class DoctorSpec extends Model {
  public userId!: number;
  public appointmentTypeId!: number;
}

DoctorSpec.init(
  {
    userId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    appointmentTypeId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "DoctorSpec",
  }
);

// one user can have one row in DoctorSpec table
DoctorSpec.belongsTo(Users, { as: "user", foreignKey: "userId" });

// one appointment type can have many rows in DoctorSpec table
DoctorSpec.belongsTo(AppointmentTypes, { as: "appointmentType", foreignKey: "appointmentTypeId" });

export default DoctorSpec;
