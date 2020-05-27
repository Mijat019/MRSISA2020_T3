import { Request, Response } from "express";
import LeaveRequestsService from "../services/LeaveRequestsService";

class LeaveRequestsController {
  public async getForUser(req: Request, res: Response) {
    try {
      const reqs = await LeaveRequestsService.getForUser(parseInt(req.params["id"], 10));
      res.send(reqs);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getForClinic(req: Request, res: Response) {
    try {
      const reqs = await LeaveRequestsService.getForClinic(parseInt(req.params["id"], 10));
      res.send(reqs);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async add(req: Request, res: Response) {
    try {
      const request = await LeaveRequestsService.add(parseInt(req.params["id"], 10), req.body);
      res.send(request);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async approve(req: Request, res: Response) {
    try {
      await LeaveRequestsService.approve(parseInt(req.params["id"], 10));
      res.send();
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async deny(req: Request, res: Response) {
    try {
      await LeaveRequestsService.deny(parseInt(req.params["id"], 10), req.body.message);
      res.send();
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new LeaveRequestsController();
