import Users from "../models/Users";
import Clinics from "../models/Clinics";
import AdminOf from "../models/AdminOf";
import { usersSelect } from "../models/Users";
import { clinicsSelect } from "../models/Clinics";
import config from "../config";
import bcrypt from "bcrypt";
import UserRole from "../models/UserRole";
import UsersService from "./UsersService";

class ClinicAdminService {
  public async getAll() {
    const clinicAdmins: any = await AdminOf.findAll({
      attributes: ["id"],
      include: [
        { model: Users, as: "admin", attributes: usersSelect },
        { model: Clinics, as: "clinic", attributes: clinicsSelect },
      ],
    });
    return clinicAdmins;
  }

  public async add(clinicAdminPayload: any, clinicId: string) {
    const { id: clinicAdminId } = await UsersService.createUser(
      clinicAdminPayload,
      UserRole.CLINIC_ADMIN
    );

    const { id } = await AdminOf.create({
      adminId: clinicAdminId,
      clinicId: clinicId,
    });
    const clinicAdmin = await AdminOf.findByPk(id, {
      include: [
        { model: Users, as: "admin", attributes: usersSelect },
        { model: Clinics, as: "clinic", attributes: clinicsSelect },
      ],
    });

    return clinicAdmin;
  }
}

export default new ClinicAdminService();
