import express from "express";
import NursesController from "../controllers/NursesController";

const router = express.Router();

// TODO: dodati proveru tokena i uloge
router.get("/", NursesController.getAll);
router.post("/", NursesController.add);
router.post("/delete", NursesController.delete);
router.post("/update", NursesController.update);

export default router;
