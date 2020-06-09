import { Request, Response } from "express";
import PatientsService from "../services/PatientsService";
import UserRole from "../models/UserRole";
import AdminAt from "../models/AdminAt";
import IncomeReportService from "../services/IncomeReportService";

class IncomeReportController {
  public async getIncome(req: any, res: Response) {
    try {
      const { clinicId }: any = await AdminAt.findOne({ where: { userId: req.user.id } });
      const income = await IncomeReportService.calculateIncome(clinicId, req.body);
      res.send({ income });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new IncomeReportController();
