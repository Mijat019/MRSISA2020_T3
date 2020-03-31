import { INTEGER } from "sequelize";
import db from "../database";
import AccountStatus from "./AccountStatus";
import { User, userOrm } from "./User";

class Patients extends User {
    public accountStatus!: AccountStatus;
}

Patients.init(
    {
        ...userOrm,
        accountStatus: {
            type: INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize: db,
        tableName: "patients"
    }
);

export default Patients;
