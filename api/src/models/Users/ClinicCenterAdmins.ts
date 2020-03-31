import { Model, INTEGER, Association } from "sequelize";
import db from "../database";
import ContactInfo from "./ContactInfo";
import AccountInfo from "./AccountInfo";

class ClinicCenterAdmins extends Model {
  public id!: number;
  public readonly contactInfo?: ContactInfo;
  public readonly accountInfo?: AccountInfo;

  // define associations
  public static associations: {
    contactInfo: Association<ClinicCenterAdmins, ContactInfo>;
    accountInfo: Association<ClinicCenterAdmins, AccountInfo>;
  };
}

ClinicCenterAdmins.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    }
  },
  {
    sequelize: db,
    tableName: "clinicCenterAdmins"
  }
);
ClinicCenterAdmins.hasOne(ContactInfo, {
  foreignKey: "ownerId",
  as: "contactInfo"
});

ClinicCenterAdmins.hasOne(AccountInfo, {
  foreignKey: "ownerId",
  as: "accountInfo"
});

export default ClinicCenterAdmins;
