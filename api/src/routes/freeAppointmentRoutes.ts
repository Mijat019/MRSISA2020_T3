import express from "express";
import FreeAppointmentController from "../controllers/FreeAppointmentController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);
router.get("/:doctorId", FreeAppointmentController.getAllForDoctor);

router.post("/", FreeAppointmentController.add);

router.patch("/:id", FreeAppointmentController.update);

router.delete("/:id", FreeAppointmentController.delete);

export default router;
