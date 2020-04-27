import config from "../config";
import jwt from "jsonwebtoken";

class AuthenticationMiddleware {
  public async verifyToken(req: any, res: any, next: any) {
    try {
      const token = req.headers["authorization"];
      const userDecoded = await jwt.verify(token, config.secret);
      req.user = userDecoded;
      next();
    } catch (error) {
      return res.status(403).send(error);
    }
  }

  public async isPatient(req: any, res: any, next: any) {}
  public async isDoctor(req: any, res: any, next: any) {}
  public async isNurse(req: any, res: any, next: any) {}
  public async isClinicAdmin(req: any, res: any, next: any) {}
  public async isClinicCenterAdmin(req: any, res: any, next: any) {}
}

export default new AuthenticationMiddleware();
