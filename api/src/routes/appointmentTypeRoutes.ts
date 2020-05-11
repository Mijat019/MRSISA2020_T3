import express from "express";
import AppointmentTypesController from "../controllers/AppointmentTypesController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();
router.use(AuthenticationMiddleware.verifyToken);
router.get("/", AppointmentTypesController.getAll);

router.post(
  "/",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_CENTER_ADMIN),
  AppointmentTypesController.add
);

router.delete(
  "/:id",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_CENTER_ADMIN),
  AppointmentTypesController.delete
);

router.patch(
  "/:id",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_CENTER_ADMIN),
  AppointmentTypesController.update
);

export default router;
