import { Options, Sequelize } from "sequelize";

const dbConfig = {
  dbName: "covid19Clinic",
  username: "root",
  password: "",
};

const options: Options = {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default new Sequelize(
  dbConfig.dbName,
  dbConfig.username,
  dbConfig.password,
  options
);
