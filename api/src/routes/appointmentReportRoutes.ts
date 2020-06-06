import { Router } from 'express';
import appointmentReportController from '../controllers/AppointmentReportController';
import authenticationMiddleware from '../middleware/AuthenticationMiddleware';

const router = Router();

router.use(authenticationMiddleware.verifyToken);

router.get('/:patientId', appointmentReportController.getAllForPatient);

router.get(
  '/approvePrescriptions/:clinicId',
  appointmentReportController.getAllForApproving
);

router.patch(
  '/approvePrescriptions/:appointmentReportId',
  appointmentReportController.approvePrescriptions
);

router.post('/', appointmentReportController.add);

export default router;
