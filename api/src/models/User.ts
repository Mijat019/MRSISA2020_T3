import { Model, STRING, INTEGER } from "sequelize";
import db from "./database";

/**
 * Ovo je samo primer
 */
class Users extends Model {
  public id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public email!: string;
  public fullName!: string;
  public password!: string;
}

Users.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: STRING,
      allowNull: false
    },
    fullName: {
      type: STRING,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: "users"
  }
);

export default Users;
