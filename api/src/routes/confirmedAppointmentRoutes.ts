import express from "express";
import ConfirmedAppointmentController from "../controllers/ConfirmedAppointmentController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);

router.get("/", ConfirmedAppointmentController.getAll);

router.patch("/", ConfirmedAppointmentController.update);

router.delete("/", ConfirmedAppointmentController.delete);

export default router;
