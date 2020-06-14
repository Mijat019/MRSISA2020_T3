import { INTEGER, STRING, Model, Association } from "sequelize";
import db from "./database";
import Clinics from "./Clinics";
import FreeAppointments from './FreeAppointments'
import ConfirmedAppointments from "./ConfirmedAppointments";
import Operations from "./Operations";

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
