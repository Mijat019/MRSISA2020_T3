import express, { Application } from "express";

import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";

import db from "./models/database";
import ClinicAdmins from "./models/Users/ClinicAdmins";
import Patients from "./models/Users/Patients";

import authentication from './routes/authenticationRoutes'
import usersRoutes from './routes/usersRoutes'


// connect to the database
(async () => {
    try {
        await db.authenticate()
            .then(() => console.log('Database connected'))
            .catch(()=> console.log('ERROR'));
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

/**
 * OVO JE SAMO TEST
 */
app.get("/", async (req: any, res: any) => {
    await Patients.create({
        email: "pera",
        password: "dsf",
        firstName: "asd",
        lastName: "adsf",
        jmbg: "sdf",
        city: "daf",
        country: "sdaf",
        address: "sadf",
        phoneNumber: "asdf"
    });
    // const resp = await Patients.findAll();
    const resp = await Patients.findOne({where : {email : 'dura'}});
    console.log(resp?.getDataValue);
    res.send({resp});
});

// login
app.use('/auth', authentication);

app.use('/users', usersRoutes);

app.listen(config.port, () =>
    console.log(`Server listening on port ${config.port}`)
);
