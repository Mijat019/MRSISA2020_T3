import express from "express";
import NursesController from "../controllers/NursesController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);
router.get("/", NursesController.getAll);
router.get("/:clinicId", NursesController.getByClinic);

router.post(
  "/",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  NursesController.add
);

router.delete(
  "/:id",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  NursesController.delete
);

export default router;
