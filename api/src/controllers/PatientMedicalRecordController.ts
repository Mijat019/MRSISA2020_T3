import { Request, Response } from "express";
import patientMedicalRecordService from "../services/PatientMedicalRecordService";
import UserRole from "../models/UserRole";
import DoctorAt from "../models/DoctorAt";
import NurseAt from "../models/NurseAt";

class PatientMedicalRecordController {
  public async get(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const patientMedicalRecord = await patientMedicalRecordService.get(
        userId
      );
      res.send(patientMedicalRecord);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const patientMedicalRecord = await patientMedicalRecordService.update(
        userId,
        req.body
      );
      res.send(patientMedicalRecord);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new PatientMedicalRecordController();
