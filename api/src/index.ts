import express, { Application } from "express";

import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";

import db from "./models/database";

import Patients from "./models/Users/Patients";
import Doctors from "./models/Users/Doctors";
import ContactInfo from "./models/Users/ContactInfo";
import AccountInfo from "./models/Users/AccountInfo";
import Nurses from "./models/Users/Nurses";
import ClinicAdmins from "./models/Users/ClinicAdmins";
import ClinicCenterAdmins from "./models/Users/ClinicCenterAdmins";

// connect to the database
(async () => {
  try {
    await db.authenticate();
    // creates tables from model
    // drops tables if they already exist
    // uncomment next line if you want to apply changes to the schema
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

/**
 * OVO JE SAMO TEST
 */
app.get("/", async (req: any, res: any) => {
  const pat = await ClinicCenterAdmins.create({});
  await ContactInfo.create({
    ownerId: pat.id,
    firstName: "mijat",
    lastName: "miletic",
    city: "vidin",
    country: "bulgaria",
    phoneNumber: "666"
  });

  await AccountInfo.create({
    ownerId: pat.id,
    email: "bulgaria<3@gmail.com",
    password: "stegicPeder",
    accountStatus: 1
  });

  // ovo je join, doda objekat "contactInfo" objektu user
  // dobije se: user: {id: 1, contactInfo: {...}, accountInfo: {...}}
  const user = await ClinicCenterAdmins.findByPk(pat.id, {
    // join
    include: [
      ClinicCenterAdmins.associations.contactInfo,
      ClinicCenterAdmins.associations.accountInfo
    ]
  });
  res.send(user);
});

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
