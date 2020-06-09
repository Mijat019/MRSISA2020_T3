import express from "express";
import RegistrationReqController from "../controllers/RegistrationReqController";
import PatientMedicalRecordController from "../controllers/PatientMedicalRecordController";
import PatientsController from "../controllers/PatientsController";

const router = express.Router();

router.post("/", RegistrationReqController.register);
router.patch("/confirm/:email", RegistrationReqController.approve);
router.patch("/reject/:email", RegistrationReqController.reject);
router.get("/activate/:email", RegistrationReqController.activate);
router.get("/requests", RegistrationReqController.get);

export default router;
