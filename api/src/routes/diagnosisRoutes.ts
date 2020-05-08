import express from "express";
import authenticationMiddleware from "../middleware/AuthenticationMiddleware";
import diagnosisController from "../controllers/DiagnosisController";
import UserRole from "../models/UserRole";

const router = express.Router();

router.use(authenticationMiddleware.verifyToken);

router.get("/", diagnosisController.getAll);

router.post(
  "/",
  authenticationMiddleware.hasRole(UserRole.CLINIC_CENTER_ADMIN),
  diagnosisController.add
);
router.patch(
  "/:id",
  authenticationMiddleware.hasRole(UserRole.CLINIC_CENTER_ADMIN),
  diagnosisController.update
);
router.delete(
  "/:id",
  authenticationMiddleware.hasRole(UserRole.CLINIC_CENTER_ADMIN),
  diagnosisController.delete
);

export default router;
