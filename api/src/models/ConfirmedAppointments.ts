import { Model, INTEGER, DATE } from "sequelize";
import db from "./database";
import Rooms from "./Rooms";
import DoctorAt from "./DoctorAt";
import PriceLists from "./PriceLists";
import Users from "./Users";

class ConfirmedAppointments extends Model {
  public id!: number;
  public priceListId!: number;
  public doctorId!: number;
  public userId!: number;
  public roomId!: number;
  public start!: Date;
  public duration!: number;
}

ConfirmedAppointments.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    priceListId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    doctorId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    userId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    roomId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    start: {
      type: DATE,
      allowNull: false,
    },

    duration: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "ConfirmedAppointments",
    sequelize: db,
  }
);

ConfirmedAppointments.belongsTo(PriceLists, {
  as: "priceList",
  foreignKey: "priceListId",
});

ConfirmedAppointments.belongsTo(Users, {
  as: "patient",
  foreignKey: "userId",
});

ConfirmedAppointments.belongsTo(Rooms, { as: "room", foreignKey: "roomId" });

ConfirmedAppointments.belongsTo(DoctorAt, { as: "doctor", foreignKey: "doctorId" });

export default ConfirmedAppointments;
