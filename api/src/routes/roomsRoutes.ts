import express from "express";
import RoomsController from "../controllers/RoomsController";

const router = express.Router();

// TODO: dodati proveru tokena i uloge
router.get("/", RoomsController.getAll);
router.post("/", RoomsController.add);
router.post("/delete", RoomsController.delete);
router.post("/update", RoomsController.update);

export default router;
