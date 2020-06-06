import db from "./database";
import { Model, INTEGER } from "sequelize";
import Users from "./Users";
import Clinics from "./Clinics";
import DoctorSpec from "./DoctorSpec";

class DoctorAt extends Model {
  public userId!: number;
  public clinicId!: number;
}

DoctorAt.init(
  {
    clinicId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },
    userId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    version: true,
    tableName: "doctor_at",
  }
);

// one user can have one row in doctorAt table
DoctorAt.belongsTo(Users, { as: "user", foreignKey: "userId" });

// one clinic can have many rows in doctorAt table
DoctorAt.belongsTo(Clinics, { as: "clinic", foreignKey: "clinicId" });

DoctorAt.hasMany(DoctorSpec, { as: "spec", foreignKey: "userId" });

export default DoctorAt;
