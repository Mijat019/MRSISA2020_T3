import express from "express";
import AppointmentTypesController from "../controllers/AppointmentTypesController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();
router.use(AuthenticationMiddleware.verifyToken);
router.get("/:clinicId", AppointmentTypesController.getAllForClinic);

router.post(
  "/",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  AppointmentTypesController.add
);

router.delete(
  "/:id",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  AppointmentTypesController.delete
);

router.patch(
  "/:id",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  AppointmentTypesController.update
);

export default router;
