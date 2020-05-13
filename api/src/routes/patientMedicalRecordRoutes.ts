import express from "express";
import patientMedicalRecordController from "../controllers/PatientMedicalRecordController";

const router = express.Router();

router.get("/:userId", patientMedicalRecordController.get);

export default router;
