import db from "./database";
import { Model, INTEGER } from "sequelize";
import Users from "./Users";
import Clinics from "./Clinics";

class DoctorAt extends Model {
  public id!: number;
  public DoctorId!: number;
  public ClinicId!: number;
}

DoctorAt.init(
  {
    ClinicId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },
    UserId: {
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
Users.hasOne(DoctorAt);
DoctorAt.belongsTo(Users);

// one clinic can have many rows in doctorAt table
Clinics.hasMany(DoctorAt);
DoctorAt.belongsTo(Clinics);

export default DoctorAt;
