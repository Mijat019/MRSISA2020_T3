import db from "./database";
import { Model, STRING, INTEGER } from "sequelize";

class Clinics extends Model {
    public id!: number;
    public name!: string;
    public address!: string;
    public description!: string;
}

Clinics.init(
    {
        id: {
            type: INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: STRING,
            allowNull: false
        },
        address: {
            type: STRING,
            allowNull: false
        },
        description: STRING
    },
    {
        sequelize: db,
        tableName: "clinics"
    }
);

export default Clinics;
