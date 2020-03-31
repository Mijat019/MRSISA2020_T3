import { Model, STRING, INTEGER } from "sequelize";
import db from "../database";

class ContactInfo extends Model {
  public id!: number;
  public ownerId!: number;
  public firstName!: string;
  public lastName!: string;
  public city!: string;
  public country!: string;
  public phoneNumber!: string;
}

ContactInfo.init(
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
    firstName: {
      type: STRING,
      allowNull: false
    },
    lastName: {
      type: STRING,
      allowNull: false
    },
    city: {
      type: STRING,
      allowNull: false
    },
    country: {
      type: STRING,
      allowNull: false
    },
    phoneNumber: {
      type: STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: db,
    tableName: "contactInfo"
  }
);

export default ContactInfo;
