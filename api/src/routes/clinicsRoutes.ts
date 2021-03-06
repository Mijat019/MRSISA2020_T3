import express from "express";
import ClinicsController from "../controllers/ClinicsController";

const router = express.Router();

// TODO: dodati proveru tokena i uloge
router.get("/", ClinicsController.getAll);
router.get("/:appoTypeId", ClinicsController.getAllForAppoType)
router.post("/", ClinicsController.add);
router.patch("/", ClinicsController.update);
router.delete("/:clinicId", ClinicsController.delete);

export default router;
