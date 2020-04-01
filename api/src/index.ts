import express, { Application } from "express";

import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";

import db from "./models/database";
import ClinicAdmins from "./models/Users/ClinicAdmins";
import Patients from "./models/Users/Patients";

// connect to the database
(async () => {
    try {
        await db.authenticate();
        // creates tables from model
        // drops tables if they already exist
        // uncomment next line if you want to apply changes to the schema
        //await db.sync({ force: true });
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

/**
 * OVO JE SAMO TEST
 */
app.get("/", async (req: any, res: any) => {
    await Patients.create({
        email: "dasd",
        password: "dsf",
        firstName: "asd",
        lastName: "adsf",
        jmbg: "sdf",
        city: "daf",
        country: "sdaf",
        address: "sadf",
        phoneNumber: "asdf"
    });
    const resp = await Patients.findAll();
    res.send(resp);
});

app.listen(config.port, () =>
    console.log(`Server listening on port ${config.port}`)
);
