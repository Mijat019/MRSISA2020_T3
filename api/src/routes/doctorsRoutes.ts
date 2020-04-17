import express from "express";
import DoctorsController from "../controllers/DoctorsController";

const router = express.Router();

// TODO: dodati proveru tokena i uloge
router.get("/", DoctorsController.getAll);
router.post("/", DoctorsController.add);
router.post("/delete", DoctorsController.delete);
router.post("/update", DoctorsController.update);

export default router;
