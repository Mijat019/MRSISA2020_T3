import express from 'express';
import doctorsController from '../controllers/DoctorsController';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';
import UserRole from '../models/UserRole';

const router = express.Router();

router.use(AuthenticationMiddleware.verifyToken);

router.get('/', doctorsController.getAll);
router.get('/:clinicId', doctorsController.getByClinic);
router.get('/:clinicId/:start', doctorsController.getAvailableDoctors);

router.post('/schedule', doctorsController.getAllForScheduling);
router.post('/availableTimes', doctorsController.getAvailableTimes);

router.post(
  '/',
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  doctorsController.add
);

router.delete(
  '/:id',
  AuthenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN),
  doctorsController.delete
);

export default router;
