import { Model, NUMBER, STRING } from "sequelize";
import db from "./database";

class Drugs extends Model {
  public id!: number;
  public name!: string;
}

Drugs.init(
  {
    id: {
      type: NUMBER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    tableName: "drugs",
    sequelize: db,
  }
);

export default Drugs;
