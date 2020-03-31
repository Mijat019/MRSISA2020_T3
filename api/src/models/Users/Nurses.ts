import { INTEGER } from "sequelize";
import db from "../database";
import AccountStatus from "./AccountStatus";
import { User, userOrm } from "./User";

class Nurses extends User {
    public accountStatus!: AccountStatus;
}

Nurses.init(
    {
        ...userOrm,
        accountStatus: {
            type: INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize: db,
        tableName: "nurses"
    }
);

export default Nurses;
