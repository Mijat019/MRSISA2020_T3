import db from "./database";
import { Model, STRING, INTEGER, Association } from "sequelize";
import Users from "./Users";
import Clinics from "./Clinics";

class NurseAt extends Model {
  public id!: number;
  public NurseId!: number;
  public ClinicId!: number;
}

NurseAt.init(
  {
    ClinicId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },
    NurseId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    }
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "nurseat",
  }
);

// one user can have one row in NurseAt table
Users.hasOne(NurseAt);
NurseAt.belongsTo(Users);

// one clinic can have many rows in NurseAt table
Clinics.hasMany(NurseAt);
NurseAt.belongsTo(Clinics);

export default NurseAt;
