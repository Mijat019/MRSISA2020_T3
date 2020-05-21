import db from "./database";
import { Model, INTEGER } from "sequelize";
import Users from "./Users";
import AppointmentTypes from "./AppointmentTypes";

class DoctorSpec extends Model {
  public id!: number;
  public userId!: number;
  public appointmentTypeId!: number;
}

DoctorSpec.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: INTEGER.UNSIGNED,
      allowNull: false
    },
    appointmentTypeId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "DoctorSpec",
    indexes: [{unique: true, fields: ["userId", "appointmentTypeId"]}]
  }
);

// one user can have one row in DoctorSpec table
DoctorSpec.belongsTo(Users, { as: "doctor", foreignKey: "userId" });

// one appointment type can have many rows in DoctorSpec table
DoctorSpec.belongsTo(AppointmentTypes, { as: "appoType", foreignKey: "appointmentTypeId" });

export default DoctorSpec;
