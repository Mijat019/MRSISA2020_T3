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
}

export default new PatientsController();
