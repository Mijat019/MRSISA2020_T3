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
}

export default new DrugsController();
