import express from "express";
import ClinicAdminController from "../controllers/ClinicAdminController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";

const router = express.Router();

router.get(
  "/",
  AuthenticationMiddleware.verifyToken,
  ClinicAdminController.getAll
);
router.post(
  "/",
  AuthenticationMiddleware.verifyToken,
  ClinicAdminController.add
);
export default router;
