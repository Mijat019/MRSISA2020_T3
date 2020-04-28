import { INTEGER, STRING, Model, Association } from "sequelize";
import db from "./database";
import AccountStatus from "./AccountStatus";

class Rooms extends Model {
    public id!: number;
    public name!: string;
    public ClinicId!: number;
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
            allowNull: false
        },
        ClinicId: {
            type: INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        timestamps: false,
        sequelize: db,
        tableName: "rooms",
    }
);

export default Rooms;
