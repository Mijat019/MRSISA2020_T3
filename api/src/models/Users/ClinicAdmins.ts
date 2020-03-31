import { INTEGER } from "sequelize";
import db from "../database";
import AccountStatus from "./AccountStatus";
import { User, userOrm } from "./User";

class ClinicAdmins extends User {
    public accountStatus!: AccountStatus;
}

ClinicAdmins.init(
    {
        ...userOrm,
        accountStatus: {
            type: INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize: db,
        tableName: "clinicAdmins"
    }
);

export default ClinicAdmins;
