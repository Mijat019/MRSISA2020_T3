import Users, { usersSelect } from "../models/Users";
import UserRole from "../models/UserRole";
import UsersService from "./UsersService";
import DoctorAt from "../models/DoctorAt";
import Clinics from "../models/Clinics";
import AdminAt from "../models/AdminAt";

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

  public async getByClinicId(_clinicId: number, _userId: number): Promise<any> {
    // Does the user id match the admin of this clinic?
    const adminAt = await AdminAt.findOne({ where: { userId: _userId, clinicId: _clinicId } });
    if (adminAt == null) {
      // Given user is NOT an admin of this clinic or either of them don't exist
      throw "Given user " + _userId + " is not an admin of clinic " + _clinicId;
    }

    const doctors = await DoctorAt.findAll({
      where: { clinicId: _clinicId },
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

  /**
   * OVO TREBA DA SE ISPRAVI DA PROVERAVA DA LI DOKTOR IMA ZAKAZANE PREGLEDE
   * ILI DODELJENE SLOBODNE PREGLEDE
   */
  public async delete(doctorId: number) {
    await Users.destroy({ where: { id: doctorId } });
  }
}

export default new DoctorsService();
