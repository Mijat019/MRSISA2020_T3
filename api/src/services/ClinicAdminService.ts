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

  public async add(clinicAdminPayload: any, clinicId: number) {
    // create a user
    const { id: clinicAdminId } = await UsersService.createEmployee(
      clinicAdminPayload,
      UserRole.CLINIC_ADMIN
    );
    // add him as an admin of a clinic
    const { UserId } = await AdminOf.create({
      UserId: clinicAdminId,
      ClinicId: clinicId,
    });
    // get the new admin and his clinic
    const clinicAdmin: any = await AdminOf.findByPk(UserId, {
      include: [
        { model: Users, attributes: usersSelect },
        { model: Clinics, attributes: clinicsSelect },
      ],
    });
    return clinicAdmin;
  }
}

export default new ClinicAdminService();
