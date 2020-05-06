import express from "express";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import drugsController from "../controllers/DrugsController";

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);

router.get("/", drugsController.getAll);
router.post("/");
router.patch("/:id");
router.delete("/:id");

export default router;
