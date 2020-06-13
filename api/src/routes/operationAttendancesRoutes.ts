import { Router } from 'express';
import authenticationMiddleware from '../middleware/AuthenticationMiddleware';
import OperationAttendancesController from '../controllers/OperationAttendancesController';

const router = Router();

router.use(authenticationMiddleware.verifyToken);
router.get('/:doctorId', OperationAttendancesController.getAllForDoctor);

export default router;
