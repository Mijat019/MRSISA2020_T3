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

  public async add(req: Request, res: Response) {
    try {
      const newDiagnosis = await diagnosisService.add(req.body);
      res.status(201).send(newDiagnosis);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedDiagnosis = await diagnosisService.update(id, req.body);
      res.send(updatedDiagnosis);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await diagnosisService.delete(id);
      res.send("Diagnosis deleted.");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new DiagnosisController();
