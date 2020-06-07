import { INTEGER, STRING, Model, Association } from "sequelize";
import db from "./database";
import Clinics from "./Clinics";

class Rooms extends Model {
  public id!: number;
  public name!: string;
  public clinicId!: number;
  public version!: number;
}

Rooms.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      unique: true,
    },
    clinicId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "rooms",
    version: true,
  }
);

Rooms.belongsTo(Clinics, { as: "clinic", foreignKey: "clinicId" });

export default Rooms;
