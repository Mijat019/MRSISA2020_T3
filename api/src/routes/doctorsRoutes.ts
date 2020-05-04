import express from "express";
import DoctorsController from "../controllers/DoctorsController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();

router.get(
    "/",
    AuthenticationMiddleware.verifyToken,
    DoctorsController.getAll
);

router.post(
    "/",
    AuthenticationMiddleware.verifyToken,
    AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
    DoctorsController.add
);

router.delete(
    "/:id",
    AuthenticationMiddleware.verifyToken,
    AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
    DoctorsController.delete
);

router.patch(
    "/",
    AuthenticationMiddleware.verifyToken,
    AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
    DoctorsController.update
);

export default router;
