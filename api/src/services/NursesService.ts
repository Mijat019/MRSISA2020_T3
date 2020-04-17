import Users from "../models/Users";
import UserRole from "../models/UserRole";

class NursesService {
    public async getAll(): Promise<any> {
        const nurses = await Users.findAll({ where: { role: UserRole.NURSE } });
        return nurses;
    }

    public async add(nursePayload: any): Promise<any> {
        const newUser = {
            ...nursePayload,
            role: UserRole.NURSE
        };
        const nurse = await Users.create(newUser);
        return nurse;
    }

    public async update(nursePayload: any): Promise<any> {
        await Users.update(nursePayload, { where: { jmbg: nursePayload.jmbg } });
        return await Users.findOne({ where: { jmbg: nursePayload.jmbg } });
    }

    public async delete(nursePayload: any) {
        console.log("Deleting " + nursePayload.jmbg);
        await Users.destroy({ where: { jmbg: nursePayload.jmbg } });
    }
}

export default new NursesService();
