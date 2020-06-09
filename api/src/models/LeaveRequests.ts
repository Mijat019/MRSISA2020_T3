import db from "./database";
import { Model, STRING, INTEGER } from "sequelize";
import Users from "./Users";
import Clinics from "./Clinics";

class LeaveRequests extends Model {
    public id!: number;
    public userId!: number;
    public clinicId!: number;
    public from!: number;
    public to!: number;
    public status!: string;
    public reason!: string;
}

LeaveRequests.init(
    {
        id: {
            type: INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: INTEGER.UNSIGNED,
            allowNull: false
        },
        clinicId: {
            type: INTEGER.UNSIGNED,
            allowNull: false
        },
        from: {
            type: INTEGER,
            allowNull: false
        },
        to: {
            type: INTEGER,
            allowNull: false
        },
        status: {
            type: STRING,
            allowNull: false
        },
        reason: {
            type: STRING,
            allowNull: true
        }
      },
      {
        timestamps: false,
        sequelize: db,
        version: true,
        tableName: "leave_requests",
      }
);

LeaveRequests.belongsTo(Users, { as: "employee", foreignKey: "userId" });
LeaveRequests.belongsTo(Clinics, { as: "clinic", foreignKey: "clinicId" });

export default LeaveRequests;