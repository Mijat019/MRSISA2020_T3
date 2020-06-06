import db from "./database";
import { Model, STRING, INTEGER, Association } from "sequelize";
import Users from "./Users";
import Clinics from "./Clinics";

class NurseAt extends Model {
  public userId!: number;
  public clinicId!: number;
}

NurseAt.init(
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
    tableName: "nurse_at",
  }
);

// one user can have one row in NurseAt table
NurseAt.belongsTo(Users, { as: "user", foreignKey: "userId" });

// one clinic can have many rows in NurseAt table
NurseAt.belongsTo(Clinics, { as: "clinic", foreignKey: "clinicId" });

export default NurseAt;
