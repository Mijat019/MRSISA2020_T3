import express from "express";
import RatingsController from "../controllers/RatingsController";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);


router.post("/doctor", RatingsController.addDoctorRating);

router.post("/clinic", RatingsController.addClinicRating);


export default router;
