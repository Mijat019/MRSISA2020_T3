import express from 'express';
import authenticationMiddleware from '../middleware/AuthenticationMiddleware';
import UserRole from '../models/UserRole';
import reportController from '../controllers/ReportController';

const router = express.Router();
router.use(authenticationMiddleware.verifyToken);
router.use(authenticationMiddleware.hasRole(UserRole.CLINIC_ADMIN));

router.post('/', reportController.getIncome);
router.post('/appointmentCount', reportController.getNumberOfAppointments);

export default router;
