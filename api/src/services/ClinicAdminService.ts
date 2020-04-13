import Users from "../models/Users";
import Clinics from "../models/Clinics";
import AdminOf from "../models/AdminOf";
import { usersSelect } from "../models/Users";
import { clinicsSelect, clinicsSelectForAdmins } from "../models/Clinics";
import UserRole from "../models/UserRole";
import UsersService from "./UsersService";

class ClinicAdminService {
  public async getAll() {
    const clinicAdmins: any = await AdminOf.findAll({
      include: [
        { model: Users, attributes: usersSelect },
        { model: Clinics, attributes: clinicsSelectForAdmins },
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
      UserId: clinicAdminId,
      ClinicId: clinicId,
    });
    const clinicAdmin = await AdminOf.findByPk(id, {
      include: [
        { model: Users, attributes: usersSelect },
        { model: Clinics, attributes: clinicsSelect },
      ],
    });
    return clinicAdmin;
  }
}

export default new ClinicAdminService();
