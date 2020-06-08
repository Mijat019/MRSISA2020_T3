import { Router } from 'express';
import authenticationMiddleware from '../middleware/AuthenticationMiddleware';

const router = Router();

router.use(authenticationMiddleware.verifyToken);

router.get('/:doctorId');
router.post('/:operationRequestId');

export default router;
