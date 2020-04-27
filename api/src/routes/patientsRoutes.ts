import express from "express";
import PatientsController from "../controllers/PatientsController";
import RegistrationReqController from "../controllers/RegistrationReqController";

const router = express.Router();

// router.post("/", PatientsController.add);

router.post("/", RegistrationReqController.register);

router.get("/confirm/:email", RegistrationReqController.confirm);

router.post("/reject/:email", RegistrationReqController.reject);

router.get("/activate/:email", RegistrationReqController.activate);

router.get("/requests", RegistrationReqController.get);

export default router;
