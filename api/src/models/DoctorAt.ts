import db from "./database";
import { Model, INTEGER } from "sequelize";
import Users from "./Users";
import Clinics from "./Clinics";

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
    tableName: "doctorat",
  }
);

// one user can have one row in doctorAt table
Users.hasOne(DoctorAt, { as: "user", foreignKey: "userId" });
DoctorAt.belongsTo(Users, { as: "user", foreignKey: "userId" });

// one clinic can have many rows in doctorAt table
Clinics.hasMany(DoctorAt, { as: "clinic", foreignKey: "clinicId" });
DoctorAt.belongsTo(Clinics, { as: "clinic", foreignKey: "clinicId" });

export default DoctorAt;
