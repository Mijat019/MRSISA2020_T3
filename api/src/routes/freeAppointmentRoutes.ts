import express from "express";
import AppointmentController from "../controllers/AppointmentController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";

const router = express.Router();

router.get(
  "/:doctorId",
  AuthenticationMiddleware.verifyToken,
  AppointmentController.getAllForDoctor
);

router.post(
  "/add",
  AuthenticationMiddleware.verifyToken,
  AppointmentController.addFreeApointment
);

router.post(
  "/update",
  AuthenticationMiddleware.verifyToken,
  AppointmentController.updateFreeApointment
);

router.post(
  "/delete",
  AuthenticationMiddleware.verifyToken,
  AppointmentController.deleteFreeApointment
);

export default router;
