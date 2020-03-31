import { INTEGER } from "sequelize";
import db from "../database";
import AccountStatus from "./AccountStatus";
import { User, userOrm } from "./User";

class Doctors extends User {
    public accountStatus!: AccountStatus;
}

Doctors.init(
    {
        ...userOrm,
        accountStatus: {
            type: INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize: db,
        tableName: "doctors"
    }
);

export default Doctors;
