import { Router } from "express";
import appointmentReportController from "../controllers/AppointmentReportController";

const router = Router();

router.get("/:patientId", appointmentReportController.getAllForPatient);

router.post("/", appointmentReportController.add);

export default router;
