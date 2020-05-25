import express from "express";
import ProfileController from "../controllers/ProfileController";

const router = express.Router();

router.post("/changePassword", ProfileController.changePassword);
router.get("/info/:id", ProfileController.getInfo);
router.post("/info", ProfileController.changeInfo);

export default router;
