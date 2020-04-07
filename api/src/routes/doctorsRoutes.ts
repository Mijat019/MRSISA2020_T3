import express from "express";
import DoctorsController from "../controllers/DoctorsController";

const router = express.Router();

// TODO: dodati proveru tokena i uloge
router.get("/", DoctorsController.getAll);
router.post("/", DoctorsController.add);

export default router;
