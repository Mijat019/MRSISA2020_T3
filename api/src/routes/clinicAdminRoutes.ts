import express from "express";
import ClinicAdminController from "../controllers/ClinicAdminController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);
router.get(
  "/",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_CENTER_ADMIN),
  ClinicAdminController.getAll
);
router.post(
  "/",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_CENTER_ADMIN),
  ClinicAdminController.add
);
export default router;
