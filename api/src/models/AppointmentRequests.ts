import { Model, INTEGER, DOUBLE, STRING, DATE } from "sequelize";
import db from "./database";
import Users from './Users'
import DoctorAt from './DoctorAt'
import Clinics from './Clinics'
import PriceLists from './PriceLists'

class AppointmentRequests extends Model {
  public id!: number;
  public priceListId!: number;
  public clinicId!: number;
  public doctorId!: number;
  public userId!: number;
  public start!: Date;
  public duration!: number;
}

AppointmentRequests.init(
  {

    id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    
    priceListId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    clinicId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    userId : {
        type: INTEGER.UNSIGNED,
        unique: false,
        allowNull: false,
    },

    doctorId : {
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
    tableName: "appointment_requests",
    sequelize: db,
  }
);

AppointmentRequests.belongsTo(Users, { as: "patient", foreignKey: "userId" });
AppointmentRequests.belongsTo(DoctorAt, { as: "doctor", foreignKey: "doctorId" });
AppointmentRequests.belongsTo(PriceLists, { as: "priceList", foreignKey: "priceListId"});
AppointmentRequests.belongsTo(Clinics, { as: "clinic", foreignKey: "clinicId"});


export default AppointmentRequests;
