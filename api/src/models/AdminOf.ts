import db from "./database";
import { Model, STRING, INTEGER, Association } from "sequelize";
import Users from "./Users";
import Clinics from "./Clinics";

class AdminOf extends Model {
  public id!: number;
  public adminId!: number;
  public clinicId!: number;

  public static associations: {
    admin: Association<Users, AdminOf>;
    clinic: Association<Clinics, AdminOf>;
  };
}

AdminOf.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    adminId: {
      type: INTEGER.UNSIGNED,
      unique: true,
      allowNull: false,
    },
    clinicId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "adminOf",
  }
);

AdminOf.belongsTo(Users, {
  targetKey: "id",
  foreignKey: "adminId",
  as: "admin",
});

AdminOf.belongsTo(Clinics, {
  targetKey: "id",
  foreignKey: "clinicId",
  as: "clinic",
});

export default AdminOf;
