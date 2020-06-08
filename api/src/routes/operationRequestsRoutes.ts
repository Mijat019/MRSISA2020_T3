import { Router } from 'express';
import operationRequestsController from '../controllers/OperationRequestsController';
import authenticationMiddleware from '../middleware/AuthenticationMiddleware';

const router = Router();

router.use(authenticationMiddleware.verifyToken);

router.get('/:clinicId', operationRequestsController.getAllForClinic);

router.post('/', operationRequestsController.add);

export default router;
