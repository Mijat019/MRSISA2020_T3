import { Request, Response } from "express";
import RegistrationReqService from "../services/RegistrationReqService";

class RegistrationReqController {
  public async get(req: any, res: any) {
    try {
      const patientRequest = await RegistrationReqService.getAll();
      res.send(patientRequest);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async register(req: Request, res: Response) {
    try {
      const user = req.body;
      await RegistrationReqService.register(user);
      res.send("Registration was successful");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async approve(req: Request, res: Response) {
    try {
      let email = req.params["email"];
      await RegistrationReqService.approveRegistration(email);
      res.send("Approval successful");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async reject(req: Request, res: Response) {
    try {
      let email = req.params["email"];
      let { reason } = req.body;
      await RegistrationReqService.rejectRegistration(email, reason);
      res.send("Rejection successful");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async activate(req: Request, res: Response) {
    try {
      let email = req.params["email"];
      await RegistrationReqService.activateRegistration(email);

      res.send("Activation successful");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new RegistrationReqController();
