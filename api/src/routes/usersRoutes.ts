import express from "express";
import UsersController from "../controllers/UsersController";

const router = express.Router();


router.post('/register', UsersController.registerPatient);

export default router;
