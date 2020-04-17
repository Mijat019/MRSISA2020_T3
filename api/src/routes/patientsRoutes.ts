import express from "express";
import PatientsController from "../controllers/PatientsController";
import RegistrationReqContoller from "../controllers/RegistrationReqContoller";

const router = express.Router();

// router.post("/", PatientsController.add);

router.post("/register", RegistrationReqContoller.register);

router.get("/register/confirm/:email", RegistrationReqContoller.confirm);

router.post("/register/reject/:email", RegistrationReqContoller.reject);

router.get("/register/activate/:email", RegistrationReqContoller.activate);

export default router;
