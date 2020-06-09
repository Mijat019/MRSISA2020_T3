import Clinics from "../models/Clinics";
import RatingsService from './RatingsService'
import AdminOf from "../models/AdminAt";
import Users from "../models/Users";
import PriceLists from "../models/PriceLists";

class ClinicsService {
  public async getAll(): Promise<any> {
    const clinics = await Clinics.findAll() as any;

    // get average rating of clinic
    for (let clinic of clinics) {
      clinic.dataValues.rating = await RatingsService.getRatingForClinic(clinic.id);
    }
    return clinics;
  }

  public async getAllForAppoType(appointmentTypeId: any): Promise<any> {

    const clinics = await Clinics.findAll({
      include: [
        {
          model: PriceLists,
          as: 'priceLists',
          required: true,
          where: { appointmentTypeId },
        },
      ],
    }) as any;

    // get average rating of clinic
    for (let clinic of clinics) {
      clinic.dataValues.rating = await RatingsService.getRatingForClinic(clinic.id);
    }
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
