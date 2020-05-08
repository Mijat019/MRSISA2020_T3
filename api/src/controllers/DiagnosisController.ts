import { Request, Response } from "express";
import diagnosisService from "../services/DiagnosisService";

class DiagnosisController {
  public async getAll(req: Request, res: Response) {
    try {
      const diagnosis = await diagnosisService.getAll();
      res.send(diagnosis);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new DiagnosisController();
