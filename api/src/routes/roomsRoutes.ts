import express from "express";
import RoomsController from "../controllers/RoomsController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();

router.get(
    "/",
    AuthenticationMiddleware.verifyToken,
    RoomsController.getAll
);

router.post(
    "/",
    AuthenticationMiddleware.verifyToken,
    AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
    RoomsController.add
);

router.post(
    "/delete",
    AuthenticationMiddleware.verifyToken,
    AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
    RoomsController.delete
);

router.post(
    "/update",
    AuthenticationMiddleware.verifyToken,
    AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
    RoomsController.update);

export default router;
