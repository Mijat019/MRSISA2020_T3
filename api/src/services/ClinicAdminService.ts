import Users from '../models/Users';
import Clinics from '../models/Clinics';
import AdminAt from '../models/AdminAt';
import { usersSelect } from '../models/Users';
import { clinicsSelectForAdmins } from '../models/Clinics';
import UserRole from '../models/UserRole';
import UsersService from './UsersService';

class ClinicAdminService {
  public async getAll() {
    const clinicAdmins: any = await AdminAt.findAll({
      include: [
        { model: Users, as: 'user', attributes: usersSelect },
        { model: Clinics, as: 'clinic', attributes: clinicsSelectForAdmins },
      ],
    });
    return clinicAdmins;
  }

  public async getMyClinic(userId: number) {
    const { clinicId }: any = await AdminAt.findOne({ where: { userId } });
    const clinic: any = await Clinics.findByPk(clinicId);
    return clinic;
  }

  public async add(clinicAdminPayload: any, clinicId: number) {
    // create a user
    const { id: userId } = await UsersService.createEmployee(
      clinicAdminPayload,
      UserRole.CLINIC_ADMIN
    );
    // add him as an admin of a clinic
    await AdminAt.create({
      userId,
      clinicId,
    });
    // get the new admin and his clinic
    const clinicAdmin: any = await AdminAt.findByPk(userId, {
      include: [
        { model: Users, as: 'user', attributes: usersSelect },
        { model: Clinics, as: 'clinic' },
      ],
    });
    return clinicAdmin;
  }
}

export default new ClinicAdminService();
