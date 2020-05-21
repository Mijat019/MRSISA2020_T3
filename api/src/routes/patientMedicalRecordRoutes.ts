import express from "express";
import patientMedicalRecordController from "../controllers/PatientMedicalRecordController";
import authenticationMiddleware from "../middleware/AuthenticationMiddleware";

const router = express.Router();

router.use(authenticationMiddleware.verifyToken);

router.get("/:userId", patientMedicalRecordController.get);

router.patch("/:userId", patientMedicalRecordController.update);

export default router;
