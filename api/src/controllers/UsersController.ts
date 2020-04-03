import { Request, Response } from "express";
import UsersService from "../services/UsersService";

class UsersController {
  public async registerPatient(req: Request, res: Response) {
    try {
      const user = req.body;
      await UsersService.registerPatient(user);
      res.send("Registration was successful");
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new UsersController();
