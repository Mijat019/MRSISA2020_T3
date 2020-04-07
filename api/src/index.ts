import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";
import db from "./models/database";

import clinicsRoutes from "./routes/clinicsRoutes";
import doctorsRoutes from "./routes/doctorsRoutes";
import authenticationRoutes from "./routes/authenticationRoutes";
import usersRoutes from "./routes/usersRoutes";

// connect to the database
(async () => {
  try {
    await db
      .authenticate()
      .then(() => console.log("Database connected"))
      .catch(() => console.log("ERROR"));
    // creates tables from model
    // drops tables if they already exist
    // uncomment next line if you want to apply changes to the schema
    // await db.sync({ force: true });
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

// routes
app.use("/clinics", clinicsRoutes);
app.use("/doctors", doctorsRoutes);
app.use("/auth", authenticationRoutes);
app.use("/users", usersRoutes);

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
