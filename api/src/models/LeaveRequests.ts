import db from "./database";
import { Model, STRING, INTEGER, DATE } from "sequelize";
import Users from "./Users";
import Clinics from "./Clinics";

class LeaveRequests extends Model {
    public id!: number;
    public userId!: number;
    public clinicId!: number;
    public from!: Date;
    public to!: Date;
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
            type: DATE,
            allowNull: false
        },
        to: {
            type: DATE,
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
        tableName: "leave_requests",
      }
);

LeaveRequests.belongsTo(Users, { as: "employee", foreignKey: "userId" });
LeaveRequests.belongsTo(Clinics, { as: "clinic", foreignKey: "clinicId" });

export default LeaveRequests;