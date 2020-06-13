import express from 'express';
import ratingsController from '../controllers/RatingsController';
import authenticationMiddleware from '../middleware/AuthenticationMiddleware';

const router = express.Router();

router.use(authenticationMiddleware.verifyToken);

router.get('/clinic', ratingsController.getClinicRating);
router.get("/rated/:patientId", ratingsController.getRatedClinicsAndDoctors);

router.post('/doctor', ratingsController.addDoctorRating);

router.post('/clinic', ratingsController.addClinicRating);

export default router;
