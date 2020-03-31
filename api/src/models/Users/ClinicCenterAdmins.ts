import { INTEGER } from "sequelize";
import db from "../database";
import AccountStatus from "./AccountStatus";
import { User, userOrm } from "./User";

class ClinicCenterAdmins extends User {
    public accountStatus!: AccountStatus;
}

ClinicCenterAdmins.init(
    {
        ...userOrm,
        accountStatus: {
            type: INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize: db,
        tableName: "clinicCenterAdmins"
    }
);

export default ClinicCenterAdmins;
