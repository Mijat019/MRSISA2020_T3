import { Options } from "sequelize";

const options: Options = {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


export default {
  port: 4200,
  saltRounds: 5,
  secret: "qwertyuiopasdfghjklzxcvbnm1234567890",
  mail : "covid19.clinic.llc@gmail.com",
  password : "M33y4tsuX!",
  tokenExpirySeconds: 14400,
  dbConfig: {
    dbName: "covid19Clinic",
    username: "root",
    password: "123456",
    options
  }
};
