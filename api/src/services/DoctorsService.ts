import Users from "../models/Users";
import UserRole from "../models/UserRole";

class DoctorsService {
    public async getAll(): Promise<any> {
        const doctors = await Users.findAll({ where: { role: UserRole.DOCTOR } });
        return doctors;
    }

    public async add(doctorPayload: any): Promise<any> {
        const newUser = {
            ...doctorPayload,
            role: UserRole.DOCTOR
        };
        const doctor = await Users.create(newUser);
        return doctor;
    }
}

export default new DoctorsService();
