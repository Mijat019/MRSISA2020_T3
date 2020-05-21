import express from "express";
import confirmedAppointmentController from "../controllers/ConfirmedAppointmentController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);

router.get("/", confirmedAppointmentController.getAll);

router.get("/:doctorId", confirmedAppointmentController.getAllForDoctor);

router.get(
  "/unfinishedForToday/:doctorId",
  confirmedAppointmentController.getAllUnfinishedForDoctorForToday
);

router.patch("/", confirmedAppointmentController.update);

router.delete("/", confirmedAppointmentController.delete);

export default router;
