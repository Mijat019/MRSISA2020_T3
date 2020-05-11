import Users, { usersSelect } from "../models/Users";
import UserRole from "../models/UserRole";
import UsersService from "./UsersService";
import NurseAt from "../models/NurseAt";
import Clinics from "../models/Clinics";
import AdminAt from "../models/AdminAt";

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

  public async getByClinicId(_clinicId: number, _userId: number): Promise<any> {
    // Does the user id match the admin of this clinic?
    const adminAt = await AdminAt.findOne({ where: { userId: _userId, clinicId: _clinicId } });
    if (adminAt == null) {
      // Given user is NOT an admin of this clinic or either of them don't exist
      throw "Given user " + _userId + " is not an admin of clinic " + _clinicId;
    }

    const nurses = await NurseAt.findAll({
      where: { clinicId: _clinicId },
      include: [
        { model: Users, attributes: usersSelect, as: "user" },
        { model: Clinics, attributes: ["name"], as: "clinic" },
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
