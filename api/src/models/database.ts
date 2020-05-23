import { Options, Sequelize } from "sequelize";

const dbConfig = {
    dbName: process.env.DB_NAME || "covid19Clinic",
    username: process.env.DB_USERNAME || "root",
    password: process.env.PASSWORD || "",
};

const options: Options = {
    host: process.env.DB_HOST || "localhost",
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
