import express from "express";
import AppointmentTypesController from "../controllers/AppointmentTypesController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();

router.get(
    "/",
    AuthenticationMiddleware.verifyToken,
    AppointmentTypesController.getAll
);

router.post(
    "/",
    AuthenticationMiddleware.verifyToken,
    AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
    AppointmentTypesController.add
);

router.post(
    "/delete",
    AuthenticationMiddleware.verifyToken,
    AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
    AppointmentTypesController.delete
);

router.post(
    "/update",
    AuthenticationMiddleware.verifyToken,
    AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
    AppointmentTypesController.update
);

export default router;
