import express from "express";
import NursesController from "../controllers/NursesController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();

router.get("/", AuthenticationMiddleware.verifyToken, NursesController.getAll);

router.post(
  "/",
  AuthenticationMiddleware.verifyToken,
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  NursesController.add
);

router.delete(
  "/:id",
  AuthenticationMiddleware.verifyToken,
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  NursesController.delete
);

export default router;
