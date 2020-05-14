import express from "express";
import AppointmentRequestsController from "../controllers/AppointmentRequestsController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();
router.use(AuthenticationMiddleware.verifyToken);

router.get("/", AppointmentRequestsController.getAll);

router.get("/:clinicId", AppointmentRequestsController.getAllForClinic)

router.post("/", AppointmentRequestsController.add);

router.patch(
  '/confirm', 
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  AppointmentRequestsController.confirm
);

router.patch(
  '/reject', 
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  AppointmentRequestsController.reject
);

router.delete(
  "/:id",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_CENTER_ADMIN),
  AppointmentRequestsController.delete
);

router.patch(
  "/:id",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_CENTER_ADMIN),
  AppointmentRequestsController.update
);

export default router;
