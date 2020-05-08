import express from "express";
import authenticationMiddleware from "../middleware/AuthenticationMiddleware";
import clinicCenterAdminController from "../controllers/ClinicCenterAdminController";

const router = express.Router();

router.use(authenticationMiddleware.verifyToken);

router.get("/", clinicCenterAdminController.getAll);
router.post("/", clinicCenterAdminController.add);

export default router;
