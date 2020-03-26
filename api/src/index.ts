import express, { Application } from "express";

import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";

const app: Application = express();

// middleware for express
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is just a test
app.get("/", (req: any, res: any) => {
  res.send("ok");
});

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
