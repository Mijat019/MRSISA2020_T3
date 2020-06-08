import Clinics from "../models/Clinics";
import AdminOf from "../models/AdminAt";
import Users from "../models/Users";

class ClinicsService {
  public async getAll(): Promise<any> {
    const clinics = await Clinics.findAll();
    return clinics;
  }

  public async add(clinicPayload: any): Promise<any> {
    const clinic = await Clinics.create(clinicPayload);
    return clinic;
  }

  public async update(clinicPayload: any): Promise<any> {
    await Clinics.upsert(clinicPayload);
    return await Clinics.findByPk(clinicPayload.id);
  }

  public async delete(id: string) {
    await Clinics.destroy({ where: { id } });
  }
}

export default new ClinicsService();
