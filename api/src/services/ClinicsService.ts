import Clinics, { clinicsSelectForRating } from '../models/Clinics';
import PriceLists from '../models/PriceLists';
import ClinicRating from '../models/ClinicRating';

class ClinicsService {
  public async getAll(): Promise<any> {
    const clinics: any = await Clinics.findAll({
      group: 'id',
      attributes: clinicsSelectForRating,
      include: [
        {
          model: ClinicRating,
          as: 'ratingList',
          attributes: ['averageRating'],
          required: true,
        },
      ],
    });

    return clinics;
  }

  public async getAllForAppoType(appointmentTypeId: any): Promise<any> {
    const clinics: any = await Clinics.findAll({
      group: 'id',
      attributes: clinicsSelectForRating,
      include: [
        {
          model: PriceLists,
          as: 'priceLists',
          required: true,
          where: { appointmentTypeId },
        },
        {
          model: ClinicRating,
          as: 'ratingList',
          attributes: ['averageRating'],
          required: true,
        },
      ],
    });

    return clinics;
  }

  public async add(clinicPayload: any): Promise<any> {
    const clinic = await Clinics.create(clinicPayload);
    return clinic;
  }

  public async update(clinicPayload: any): Promise<any> {
    const { version }: any = await Clinics.findByPk(clinicPayload.id);
    if (version != clinicPayload.version) {
      throw new Error('Optimistic lock error');
    }

    clinicPayload.version += 1;
    await Clinics.upsert(clinicPayload);
    return await Clinics.findByPk(clinicPayload.id);
  }

  public async delete(id: string) {
    await Clinics.destroy({ where: { id } });
  }
}

export default new ClinicsService();
