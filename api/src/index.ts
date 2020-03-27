import express, { Application } from "express";

import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";

import db from "./models/database";

import Users from "./models/User";

// connect to the database
(async () => {
  try {
    await db.authenticate();
    await db.sync({ force: true });
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
  }
})();

const app: Application = express();

// middleware for express
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is just a test
app.get("/", async (req: any, res: any) => {
  const resp = await Users.findAll();
  res.send(resp);
});

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
