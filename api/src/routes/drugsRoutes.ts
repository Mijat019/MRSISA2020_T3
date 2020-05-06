import express from "express";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);

router.get("/");
router.post("/");
router.patch("/:id");
router.delete("/:id");

export default router;
