import { Model, INTEGER, Association } from "sequelize";
import db from "../database";
import ContactInfo from "./ContactInfo";
import AccountInfo from "./AccountInfo";

class Nurses extends Model {
  public id!: number;
  public readonly contactInfo?: ContactInfo;
  public readonly accountInfo?: AccountInfo;

  // define associations
  public static associations: {
    contactInfo: Association<Nurses, ContactInfo>;
    accountInfo: Association<Nurses, AccountInfo>;
  };
}

Nurses.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    }
  },
  {
    sequelize: db,
    tableName: "nurses"
  }
);

Nurses.hasOne(ContactInfo, {
  foreignKey: "ownerId",
  as: "contactInfo"
});

Nurses.hasOne(AccountInfo, {
  foreignKey: "ownerId",
  as: "accountInfo"
});

export default Nurses;
