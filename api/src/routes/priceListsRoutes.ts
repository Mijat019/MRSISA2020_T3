import express from "express";
import PriceListsController from "../controllers/PriceListsController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import UserRole from "../models/UserRole";

const router = express.Router();
router.use(AuthenticationMiddleware.verifyToken);

router.get("/:clinicId", PriceListsController.getAllForClinic);

router.get("/forDoctor/:doctorId", PriceListsController.getAllForDoctor);

router.post(
    "/",
    AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
    PriceListsController.add
);

router.delete(
    "/:id",
    AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
    PriceListsController.delete
);

router.patch(
    "/:id",
    AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
    PriceListsController.update
);

export default router;
