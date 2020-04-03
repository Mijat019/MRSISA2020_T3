import express from "express";
import ClinicsController from "../controllers/ClinicsController";

const router = express.Router();

// TODO: dodati proveru tokena i uloge
router.get("/", ClinicsController.getAll);
router.post("/", ClinicsController.add);

export default router;