import { Model, INTEGER, Association } from "sequelize";
import db from "../database";
import ContactInfo from "./ContactInfo";
import AccountInfo from "./AccountInfo";

class Patients extends Model {
  public id!: number;
  public readonly contactInfo?: ContactInfo;
  public readonly accountInfo?: AccountInfo;

  // define associations
  public static associations: {
    contactInfo: Association<Patients, ContactInfo>;
    accountInfo: Association<Patients, AccountInfo>;
  };
}

Patients.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    }
  },
  {
    sequelize: db,
    tableName: "patients"
  }
);

Patients.hasOne(ContactInfo, {
  foreignKey: "ownerId",
  as: "contactInfo"
});

Patients.hasOne(AccountInfo, {
  foreignKey: "ownerId",
  as: "accountInfo"
});

export default Patients;
