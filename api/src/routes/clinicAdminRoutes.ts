import express from "express";
import ClinicAdminController from "../controllers/ClinicAdminController";
const router = express.Router();

router.get("/", ClinicAdminController.getAll);

export default router;
