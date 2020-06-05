import { Model, INTEGER, DOUBLE, STRING } from "sequelize";
import db from "./database";
import Clinics from "./Clinics";
import AppointmentTypes from "./AppointmentTypes";

class PriceLists extends Model {
    public id!: number;
    public price!: number;
    public clinicId!: number;
    public appointmentTypeId!: number;
}

PriceLists.init(
<<<<<<< HEAD
  {
    clinicId: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
    },
    
    appointmentTypeId : {
        type: INTEGER.UNSIGNED,
        allowNull: false,
    },

    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    price : {
        type: DOUBLE,
        allowNull: false,
=======
    {
        clinicId: {
            type: INTEGER.UNSIGNED,
            // primaryKey: true,
            // unique: false,
            allowNull: false,
        },

        appointmentTypeId: {
            type: INTEGER.UNSIGNED,
            // primaryKey: true,
            // unique: false,
            allowNull: false,
        },

        id: {
            type: INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        price: {
            type: DOUBLE,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: "priceLists",
        indexes: [{ unique: true, fields: ["clinicId", "appointmentTypeId"] }],
        sequelize: db,
>>>>>>> feature/KP-108
    }
);

PriceLists.belongsTo(Clinics, { as: "clinic", foreignKey: "clinicId" });
PriceLists.belongsTo(AppointmentTypes, {
    as: "appointmentType",
    foreignKey: "appointmentTypeId",
});
AppointmentTypes.hasMany(PriceLists, {
    as: "priceList",
    foreignKey: "appointmentTypeId",
});

export default PriceLists;
