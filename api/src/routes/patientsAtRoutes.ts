import express from "express";
import ClinicsController from "../controllers/ClinicsController";
import PatientsController from "../controllers/PatientsController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";

const router = express.Router();
router.use(AuthenticationMiddleware.verifyToken);
router.get(
    "/",
    PatientsController.getMyPatients);

export default router;
