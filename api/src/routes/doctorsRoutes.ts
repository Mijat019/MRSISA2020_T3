import express from "express";
import DoctorsController from "../controllers/DoctorsController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);

router.get("/", DoctorsController.getAll);
router.get("/:clinicId", DoctorsController.getByClinic);

router.post("/schedule", DoctorsController.getAllForScheduling);
router.post("/availableTimes", DoctorsController.getAvailableTimes);

router.post(
  "/",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  DoctorsController.add
);

router.delete(
  "/:id",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  DoctorsController.delete
);



export default router;
