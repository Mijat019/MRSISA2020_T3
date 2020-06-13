import { Request, Response } from "express";
import PatientsService from "../services/PatientsService";
import UserRole from "../models/UserRole";
import DoctorAt from "../models/DoctorAt";
import NurseAt from "../models/NurseAt";

class PatientsController {
  public async add(req: Request, res: Response) {
    try {
      const user = req.body;
      await PatientsService.add(user);
      res.send("Registration was successful");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getMyPatients(req: any, res: Response) {
    try {
      let clinicId: any = 0;
      if (req.user.role == UserRole.DOCTOR) {
        const doctorAt = await DoctorAt.findByPk(req.user.id);
        clinicId = doctorAt?.clinicId;
      } else if (req.user.role == UserRole.NURSE) {
        const nurseAt = await NurseAt.findByPk(req.user.id);
        clinicId = nurseAt?.clinicId;
      } else {
        res.status(403).send("You are not a doctor or a nurse, you have no patients.");
        return;
      }
      const patients = await PatientsService.getForClinic(clinicId);
      res.send(patients);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }  
}

export default new PatientsController();
