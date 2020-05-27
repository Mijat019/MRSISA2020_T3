import express from "express";
import authenticationMiddleware from "../middleware/AuthenticationMiddleware";
import drugsController from "../controllers/DrugsController";
import UserRole from "../models/UserRole";
import LeaveRequestController from "../controllers/LeaveRequestsController";

const router = express.Router();

router.use(authenticationMiddleware.verifyToken);

router.get("/user/:id", LeaveRequestController.getForUser);
router.post("/user/:id", LeaveRequestController.add);

router.get("/clinic/:id", LeaveRequestController.getForClinic);

router.post("/approve/:id", LeaveRequestController.approve);
router.post("/deny/:id", LeaveRequestController.deny);

export default router;