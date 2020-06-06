import { Model, INTEGER, DOUBLE, STRING } from "sequelize";
import db from "./database";
import PriceLists from "./PriceLists";

class AppointmentTypes extends Model {
    public id!: number;
    public name!: string;
}

AppointmentTypes.init(
    {
        id: {
            type: INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: "appointment_types",
        sequelize: db,
        version: true,
    }
);

export default AppointmentTypes;

export const appTypesSelect = ["id", "name"];
