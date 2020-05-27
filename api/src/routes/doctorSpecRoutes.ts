import express from "express";
import DoctorsController from "../controllers/DoctorsController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);

router.post(
  "/",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  DoctorsController.addSpecialization
);

router.delete(
  "/:doctorId/:appoTypeId",
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  DoctorsController.deleteSpecialization
);



export default router;
