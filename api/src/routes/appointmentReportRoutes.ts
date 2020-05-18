import { Router } from "express";
import appointmentReportController from "../controllers/AppointmentReportController";

const router = Router();

router.post("/", appointmentReportController.add);

export default router;
