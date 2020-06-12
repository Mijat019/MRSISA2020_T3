import express from "express";
import RoomsController from "../controllers/RoomsController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);

router.get("/:id", RoomsController.getAllForClinic);

router.post("/available", RoomsController.getAvailableForClinic);
router.post("/availableTimes", RoomsController.getAvailableTimes);

router.post(
  "/",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  RoomsController.add
);

router.delete(
  "/:id",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  RoomsController.delete
);

router.patch(
  "/:id",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  RoomsController.update
);

export default router;
