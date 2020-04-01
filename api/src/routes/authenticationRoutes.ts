import express from "express";
import AuthenticationController from "../controllers/AuthenticationController";

const router = express.Router();

router.post('/login', AuthenticationController.login);


router.post('/register', AuthenticationController.register);

export default router;
