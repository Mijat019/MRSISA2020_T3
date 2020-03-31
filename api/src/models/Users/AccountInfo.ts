import { Model, STRING, INTEGER } from "sequelize";
import db from "../database";
import AccountStatus from "./AccountStatus";

class AccountInfo extends Model {
  public id!: number;
  public ownerId!: number;
  public email!: string;
  public password!: string;
  public accountStatus!: AccountStatus;
}

AccountInfo.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    ownerId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      unique: true
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: STRING,
      allowNull: false
    },
    accountStatus: {
      type: INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: "accountInfo"
  }
);

export default AccountInfo;
