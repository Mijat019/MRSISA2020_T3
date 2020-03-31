import { Model, INTEGER, Association } from "sequelize";
import db from "../database";
import AccountInfo from "./AccountInfo";
import ContactInfo from "./ContactInfo";

class ClinicAdmins extends Model {
  public id!: number;
  public readonly contactInfo?: ContactInfo;
  public readonly accountInfo?: AccountInfo;

  // define associations
  public static associations: {
    contactInfo: Association<ClinicAdmins, ContactInfo>;
    accountInfo: Association<ClinicAdmins, AccountInfo>;
  };
}

ClinicAdmins.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    }
  },
  {
    sequelize: db,
    tableName: "clinicAdmins"
  }
);

ClinicAdmins.hasOne(ContactInfo, {
  foreignKey: "ownerId",
  as: "contactInfo"
});

ClinicAdmins.hasOne(AccountInfo, {
  foreignKey: "ownerId",
  as: "accountInfo"
});

export default ClinicAdmins;
