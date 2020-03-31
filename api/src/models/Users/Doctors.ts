import { Model, INTEGER, Association } from "sequelize";
import db from "../database";
import ContactInfo from "./ContactInfo";
import AccountInfo from "./AccountInfo";

class Doctors extends Model {
  public id!: number;
  public readonly contactInfo?: ContactInfo;
  public readonly accountInfo?: AccountInfo;

  // define associations
  public static associations: {
    contactInfo: Association<Doctors, ContactInfo>;
    accountInfo: Association<Doctors, AccountInfo>;
  };
}

Doctors.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    }
  },
  {
    sequelize: db,
    tableName: "doctors"
  }
);

Doctors.hasOne(ContactInfo, {
  foreignKey: "ownerId",
  as: "contactInfo"
});

Doctors.hasOne(AccountInfo, {
  foreignKey: "ownerId",
  as: "accountInfo"
});

export default Doctors;
