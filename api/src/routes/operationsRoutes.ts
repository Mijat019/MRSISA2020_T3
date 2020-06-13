import { Router } from 'express';
import authenticationMiddleware from '../middleware/AuthenticationMiddleware';
import operationsController from '../controllers/OperationsController';

const router = Router();

router.use(authenticationMiddleware.verifyToken);
router.get('/clinic/:clinicId', operationsController.getAllForClinic);
router.get('/doctor/:doctorId', operationsController.getAllForDoctor);
router.post(
  '/:operationRequestId',
  operationsController.createOperationFromOperationRequest
);

export default router;
