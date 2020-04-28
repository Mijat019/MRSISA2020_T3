import express from "express";
import AppointmentController from "../controllers/AppointmentController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";

const router = express.Router();

router.get(
  "/:doctorId",
  AuthenticationMiddleware.verifyToken,
  AppointmentController.getAllForDoctor
);

export default router;
