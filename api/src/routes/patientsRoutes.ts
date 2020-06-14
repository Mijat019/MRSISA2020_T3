import express from 'express';
import RegistrationReqController from '../controllers/RegistrationReqController';

const router = express.Router();

router.post('/', RegistrationReqController.register);
router.patch('/confirm/:email', RegistrationReqController.approve);
router.patch('/reject/:email', RegistrationReqController.reject);
router.get('/activate/:email', RegistrationReqController.activate);
router.get('/requests', RegistrationReqController.get);

export default router;
