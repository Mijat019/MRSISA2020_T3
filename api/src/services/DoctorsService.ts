import Users from "../models/Users";
import UserRole from "../models/UserRole";
import UsersService from "./UsersService";
import DoctorAt from "../models/DoctorAt";

class DoctorsService {
  public async getAll(): Promise<any> {
    const doctors = await Users.findAll({ where: { role: UserRole.DOCTOR } });
    return doctors;
  }

  public async add(doctorPayload: any, clinicId: number): Promise<any> {
    // Create user
    const doctor = await UsersService.createEmployee(
      doctorPayload,
      UserRole.DOCTOR
    );

    // Link with clinic
    await DoctorAt.create({ UserId: doctor.id, ClinicId: clinicId });
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
