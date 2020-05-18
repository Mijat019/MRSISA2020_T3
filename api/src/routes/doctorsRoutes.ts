import express from "express";
import DoctorsController from "../controllers/DoctorsController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);

// SPECIALIZATIONS
router.get(
  "/spec/:doctorId",
  DoctorsController.getSpecializations
);

router.post(
  "/spec",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  DoctorsController.addSpecialization
);

router.delete(
  "/spec",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  DoctorsController.deleteSpecialization
);

router.get("/", DoctorsController.getAll);
router.get("/:clinicId", DoctorsController.getByClinic);
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
