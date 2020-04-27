import express from "express";
import AuthenticationController from "../controllers/AuthenticationController";

const router = express.Router();

router.post("/login", AuthenticationController.login);
router.post("/setPassword", AuthenticationController.setPassword);
router.post("/verify", AuthenticationController.verifyToken);

export default router;
