import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";
import db from "./models/database";
import initModel from "./models/initModel";
import initModelStega from "./models/initModelStega";

import clinicsRoutes from "./routes/clinicsRoutes";
import doctorsRoutes from "./routes/doctorsRoutes";
import doctorSpecRoutes from "./routes/doctorSpecRoutes";
import clinicAdminRoutes from "./routes/clinicAdminRoutes";
import nurseRoutes from "./routes/nursesRoutes";
import roomRoutes from "./routes/roomsRoutes";
import authenticationRoutes from "./routes/authenticationRoutes";
import patientsRoutes from "./routes/patientsRoutes";
import freeAppointmentRoutes from "./routes/freeAppointmentRoutes";
import confirmedAppointmentRoutes from "./routes/confirmedAppointmentRoutes";
import appointmentTypeRoutes from "./routes/appointmentTypeRoutes";
import drugsRoutes from "./routes/drugsRoutes";
import diagnosisRoutes from "./routes/diagnosisRoutes";
import clinicCenterAdminRoutes from "./routes/clinicCenterAdminRoutes";
import priceListsRoutes from './routes/priceListsRoutes';

// connect to the database
(async () => {
  try {
    await db
      .authenticate()
      .then(() => console.log("Connected to the database"))
      .catch(() =>
        console.log("An error occurred while trying to connect to the database")
      );

    // creates tables from model
    // drops tables if they already exist
    // uncomment next line if you want to apply changes to the schema
    //await db.sync({ force: true });
    //await initModelStega();
    //await initModel();

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
app.use("/doctorSpec", doctorSpecRoutes);
app.use("/nurses", nurseRoutes);
app.use("/rooms", roomRoutes);
app.use("/auth", authenticationRoutes);
app.use("/patients", patientsRoutes);
app.use("/clinicAdmins", clinicAdminRoutes);
app.use("/freeAppointments", freeAppointmentRoutes);
app.use("/confirmedAppointments", confirmedAppointmentRoutes);
app.use("/appointmentTypes", appointmentTypeRoutes);
app.use("/priceLists", priceListsRoutes);
app.use("/drugs", drugsRoutes);
app.use("/diagnosis", diagnosisRoutes);
app.use("/clinicCenterAdmins", clinicCenterAdminRoutes);

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
