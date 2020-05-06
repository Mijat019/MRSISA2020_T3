import { Request, Response } from "express";
import drugsService from "../services/DrugsService";

class DrugsController {
  public async getAll(req: Request, res: Response) {
    try {
      const drugs = await drugsService.getAll();
      res.send(drugs);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async add(req: Request, res: Response) {
    try {
      const newDrug = await drugsService.add(req.body);
      res.status(201).send(newDrug);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedDrug = await drugsService.update(id, req.body);
      res.send(updatedDrug);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await drugsService.delete(id);
      res.send("Drug deleted.");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new DrugsController();
