import Clinics from "../models/Clinics";

class ClinicsService {
    public async getAll(): Promise<any> {
        const clinics = await Clinics.findAll();
        return clinics;
    }
}

export default new ClinicsService();
