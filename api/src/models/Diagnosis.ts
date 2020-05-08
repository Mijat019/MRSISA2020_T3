import { Model, INTEGER, STRING } from "sequelize";
import db from "./database";

class Diagnosis extends Model {
  public id!: number;
  public name!: string;
}

Diagnosis.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
  },
  { tableName: "diagnosis", sequelize: db, timestamps: false }
);

export default Diagnosis;
