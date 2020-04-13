import db from "./database";
import { Model, STRING, INTEGER, Association } from "sequelize";
import Users from "./Users";
import Clinics from "./Clinics";

class AdminOf extends Model {
  public id!: number;
  public adminId!: number;
  public clinicId!: number;
}

AdminOf.init(
  {
    ClinicId: {
      type: INTEGER.UNSIGNED,
      unique: false,
    },
    UserId: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "adminOf",
  }
);

// one user can have one row in adminOf table
Users.hasOne(AdminOf);
AdminOf.belongsTo(Users);

// one clinic can have many rows in adminOf table
Clinics.hasMany(AdminOf);
AdminOf.belongsTo(Clinics);

export default AdminOf;
