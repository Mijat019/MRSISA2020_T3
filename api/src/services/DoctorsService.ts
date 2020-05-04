import Users, { usersSelect } from "../models/Users";
import UserRole from "../models/UserRole";
import UsersService from "./UsersService";
import DoctorAt from "../models/DoctorAt";
import Clinics from "../models/Clinics";

class DoctorsService {
  public async getAll(): Promise<any> {
    const doctors = await DoctorAt.findAll({
      include: [
        { model: Users, attributes: usersSelect, as: "user" },
        { model: Clinics, attributes: ["name"], as: "clinic" },
      ],
    });
    return doctors;
  }

  public async add(doctorPayload: any, clinicId: number): Promise<any> {
    // Create user
    const { id: userId } = await UsersService.createEmployee(
      doctorPayload,
      UserRole.DOCTOR
    );

    // Link with clinic
    await DoctorAt.create({ userId, clinicId });
    const doctor = await DoctorAt.findByPk(userId, {
      include: [
        { model: Users, attributes: usersSelect, as: "user" },
        { model: Clinics, attributes: ["name"], as: "clinic" },
      ],
    });
    return doctor;
  }

  public async update(doctorPayload: any): Promise<any> {
    await Users.update(doctorPayload, { where: { jmbg: doctorPayload.jmbg } });
    return await Users.findOne({ where: { jmbg: doctorPayload.jmbg } });
  }

  public async delete(doctorId: number) {
    await Users.destroy({ where: { id: doctorId } });
  }
}

export default new DoctorsService();
