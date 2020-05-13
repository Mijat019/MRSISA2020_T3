import { Model, INTEGER, DECIMAL, STRING } from "sequelize";
import sequelize from "./database";
import Users from "./Users";

class PatientMedicalRecord extends Model {
  public userId!: number;
  public height!: number;
  public weight!: number;
  public bloodType!: string;
}

PatientMedicalRecord.init(
  {
    userId: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },

    height: {
      type: DECIMAL,
      allowNull: true,
    },

    weight: {
      type: DECIMAL,
      allowNull: true,
    },

    bloodType: {
      type: STRING,
      allowNull: true,
    },
  },
  { sequelize, tableName: "patientMedicalRecord", timestamps: false }
);

PatientMedicalRecord.belongsTo(Users, { as: "user", foreignKey: "userId" });

export default PatientMedicalRecord;
