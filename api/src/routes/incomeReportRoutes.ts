import express from "express";
import RegistrationReqController from "../controllers/RegistrationReqController";
import PatientMedicalRecordController from "../controllers/PatientMedicalRecordController";
import PatientsController from "../controllers/PatientsController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";
import IncomeReportController from "../controllers/IncomeReportController";

const router = express.Router();
router.use(AuthenticationMiddleware.verifyToken);
router.use(AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN));

router.post("/", IncomeReportController.getIncome);

export default router;
