import { Request, Response } from "express";
import Users from "../models/Users";
import UserRole from "../models/UserRole";
import usersService from "../services/UsersService";

class ClinicCenterAdminController {
  public async getAll(req: Request, res: Response) {
    try {
      const clinicCenterAdmins = await Users.findAll({
        where: { role: UserRole.CLINIC_CENTER_ADMIN },
      });
      res.send(clinicCenterAdmins);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async add(req: Request, res: Response) {
    try {
      const clinicCenterAdmin = await usersService.createEmployee(
        req.body,
        UserRole.CLINIC_CENTER_ADMIN
      );
      res.send(clinicCenterAdmin);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new ClinicCenterAdminController();
