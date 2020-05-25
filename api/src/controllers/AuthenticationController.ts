import { Request, Response } from "express";
import AuthenticationService from "../services/AuthenticationService";
import jwt from "jsonwebtoken";
import config from "../config";

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

  public async verifyToken(req: any, res: any) {
    try {
      const token = req.headers["authorization"];
      await jwt.verify(token, config.secret);
      return res.send({ token });
    } catch (error) {
      res.status(403).send("Forbidden");
    }
  }

  public async setPassword(req: any, res: any) {
    try {
      const { id, password } = req.body;
      await AuthenticationService.setPassword(id, password);
      res.send("Password set.");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async changePassword(req: any, res: any) {
    try {
      const { id, password } = req.body;
      await AuthenticationService.changePassword(id, password);
      res.send("Password changed.");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async changeInfo(req: any, res: any) {
    try {
      let userInfo = await AuthenticationService.changeInfo(req.body);
      res.send(userInfo);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new AuthenticationController();
