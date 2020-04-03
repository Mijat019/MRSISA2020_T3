import express from "express";
import AuthenticationController from "../controllers/AuthenticationController";

const router = express.Router();

router.post('/login', AuthenticationController.login);


export default router;
