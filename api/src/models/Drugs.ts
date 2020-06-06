import { Model, INTEGER, STRING } from "sequelize";
import db from "./database";

class Drugs extends Model {
  public id!: number;
  public name!: string;
}

Drugs.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "drugs",
    version: true,
    sequelize: db,
  }
);

export default Drugs;
