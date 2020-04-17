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

    public async update(doctorPayload: any): Promise<any> {
        await Users.update(doctorPayload, { where: { jmbg: doctorPayload.jmbg } });
        return await Users.findOne({ where: { jmbg: doctorPayload.jmbg } });
    }

    public async delete(doctorPayload: any) {
        console.log("Deleting " + doctorPayload.jmbg);
        await Users.destroy({ where: { jmbg: doctorPayload.jmbg } });
    }
}

export default new DoctorsService();
