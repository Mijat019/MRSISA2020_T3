import Users, { usersSelect } from "../models/Users";
import UserRole from "../models/UserRole";
import UsersService from "./UsersService";
import NurseAt from "../models/NurseAt";
import Clinics from "../models/Clinics";

class NursesService {
  public async getAll(): Promise<any> {
    const nurses = await NurseAt.findAll({
      include: [
        { model: Users, as: "user", attributes: usersSelect },
        { model: Clinics, as: "clinic" },
      ],
    });
    return nurses;
  }

  public async add(nursePayload: any, clinicId: number): Promise<any> {
    // Create user
    const { id: userId } = await UsersService.createEmployee(
      nursePayload,
      UserRole.NURSE
    );

    // Link with clinic
    await NurseAt.create({ userId, clinicId });
    const nurse = await NurseAt.findByPk(userId, {
      include: [
        { model: Users, as: "user", attributes: usersSelect },
        { model: Clinics, as: "clinic" },
      ],
    });
    return nurse;
  }

  public async update(nursePayload: any): Promise<any> {
    await Users.update(nursePayload, { where: { jmbg: nursePayload.jmbg } });
    return await Users.findOne({ where: { jmbg: nursePayload.jmbg } });
  }

  public async delete(nurseId: number) {
    await Users.destroy({ where: { id: nurseId } });
  }
}

export default new NursesService();
