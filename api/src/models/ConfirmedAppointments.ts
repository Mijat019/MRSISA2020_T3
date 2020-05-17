import {
  Model,
  INTEGER,
  DATE,
  Options,
  ModelAttributeColumnOptions,
} from "sequelize";
import db from "./database";
import Rooms from "./Rooms";
import DoctorAt from "./DoctorAt";
import PriceLists from "./PriceLists";
import PatientMedicalRecord from "./PatientMedicalRecord";

const requiredUnsignedInteger: ModelAttributeColumnOptions = {
  type: INTEGER.UNSIGNED,
  allowNull: false,
};

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

    priceListId: requiredUnsignedInteger,

    doctorId: requiredUnsignedInteger,

    patientId: requiredUnsignedInteger,

    roomId: requiredUnsignedInteger,

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

ConfirmedAppointments.belongsTo(PatientMedicalRecord, {
  as: "patient",
  foreignKey: "patientId",
});

ConfirmedAppointments.belongsTo(Rooms, { as: "room", foreignKey: "roomId" });

ConfirmedAppointments.belongsTo(DoctorAt, {
  as: "doctor",
  foreignKey: "doctorId",
});

export default ConfirmedAppointments;
