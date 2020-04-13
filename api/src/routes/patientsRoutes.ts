import express from "express";
import PatientsController from "../controllers/PatientsController";

const router = express.Router();

router.post("/", PatientsController.add);

export default router;
