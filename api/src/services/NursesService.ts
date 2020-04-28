import Users from "../models/Users";
import UserRole from "../models/UserRole";
import UsersService from "./UsersService";
import NurseAt from "../models/NurseAt";

class NursesService {
  public async getAll(): Promise<any> {
    const nurses = await Users.findAll({ where: { role: UserRole.NURSE } });
    return nurses;
  }

  public async add(nursePayload: any, clinicId: number): Promise<any> {
    // Create user
    const nurse = await UsersService.createEmployee(
      nursePayload,
      UserRole.NURSE
    );

    // Link with clinic
    await NurseAt.create({ NurseId: nurse.id, ClinicId: clinicId });
    return nurse;
  }

  public async update(nursePayload: any): Promise<any> {
    await Users.update(nursePayload, { where: { jmbg: nursePayload.jmbg } });
    return await Users.findOne({ where: { jmbg: nursePayload.jmbg } });
  }

  public async delete(nursePayload: any) {
    await Users.destroy({ where: { jmbg: nursePayload.jmbg } });
  }
}

export default new NursesService();
