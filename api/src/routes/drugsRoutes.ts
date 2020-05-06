import express from "express";
import authenticationMiddleware from "../middleware/AuthenticationMiddleware";
import drugsController from "../controllers/DrugsController";
import UserRole from "../models/UserRole";

const router = express.Router();

router.use(authenticationMiddleware.verifyToken);

router.get("/", drugsController.getAll);
router.post(
  "/",
  authenticationMiddleware.hasRole(UserRole.CLINIC_CENTER_ADMIN),
  drugsController.add
);
router.patch(
  "/:id",
  authenticationMiddleware.hasRole(UserRole.CLINIC_CENTER_ADMIN),
  drugsController.update
);
router.delete("/:id");

export default router;
