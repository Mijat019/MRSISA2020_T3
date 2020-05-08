import express from "express";
import authenticationMiddleware from "../middleware/AuthenticationMiddleware";
import diagnosisController from "../controllers/DiagnosisController";

const router = express.Router();

// router.use(authenticationMiddleware.verifyToken);

router.get("/", diagnosisController.getAll);

export default router;
