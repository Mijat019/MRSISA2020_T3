import { Request, Response } from "express";
import AuthenticationService from "../services/AuthenticationService";

class AuthenticationController {
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await AuthenticationService.authenticateUser(
        email,
        password
      );
      const token = await AuthenticationService.generateToken(user);
      res.send({ token });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new AuthenticationController();
