import Clinics from "../models/Clinics";

class ClinicsService {
    public async getAll(): Promise<any> {
        const clinics = await Clinics.findAll();
        return clinics;
    }

    public async add(clinicPayload: any): Promise<any> {
        const clinic = await Clinics.create(clinicPayload);
        return clinic;
    }
}

export default new ClinicsService();
