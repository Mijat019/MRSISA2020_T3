import Clinics from "../models/Clinics";
import AdminOf from "../models/AdminOf";
import Users from "../models/Users";

class ClinicsService {
  public async getAll(): Promise<any> {
    const clinics = await Clinics.findAll({});

    console.log(clinics);
    return clinics;
  }

  public async add(clinicPayload: any): Promise<any> {
    const clinic = await Clinics.create(clinicPayload);
    return clinic;
  }

  public async delete(id: string) {
    await Clinics.destroy({ where: { id } });
  }
}

export default new ClinicsService();
