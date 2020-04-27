import config from "../config";
import jwt from "jsonwebtoken";
import UserRole from "../models/UserRole";

class AuthenticationMiddleware {
  public async verifyToken(req: any, res: any, next: any) {
    try {
      const token = req.headers["authorization"];
      const userDecoded = await jwt.verify(token, config.secret);
      req.user = userDecoded;
      next();
    } catch (error) {
      res.status(403).send("Forbidden");
    }
  }

  public hasRole(role: UserRole) {
    return async function (req: any, res: any, next: any) {
      if (req.user.role === role) {
        return next();
      }
      res.status(401).send("Unauthorized");
    };
  }
}

export default new AuthenticationMiddleware();
