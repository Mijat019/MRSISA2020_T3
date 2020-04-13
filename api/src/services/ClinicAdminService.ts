import Users from "../models/Users";
import AdminOf from "../models/AdminOf";
import UserRole from "../models/UserRole";
import Clinics from "../models/Clinics";

class ClinicAdminService {
  public async getAll() {
    const clinicAdmins: any = await AdminOf.findAll({
      include: [
        { model: Users, as: "admin" },
        { model: Clinics, as: "clinic" },
      ],
    });
    return clinicAdmins;
  }
}

export default new ClinicAdminService();
