import DoctorRating from '../models/DoctorRating';
import ClinicRating from '../models/ClinicRating';

class RatingService {
  public async getRatingForDoctor(doctorId: any): Promise<any> {
    const allRatings = await DoctorRating.findAll({ where: { doctorId } });
    const size = allRatings.length;

    // sum up all avg ratings
    const total = allRatings.reduce((a, b) => +a + +b.averageRating, 0);
    return total / size;
  }

  public async getRatingForClinic(clinicId: any): Promise<any> {
    const allRatings = await ClinicRating.findAll({ where: { clinicId } });
    const size = allRatings.length;

    // sum up all avg ratings
    const total = allRatings.reduce((a, b) => +a + +b.averageRating, 0);
    return total / size;
  }

  public async getRatedClinicsAndDoctors(patientId: any): Promise<any> {
    const clinics = await ClinicRating.findAll({
      where: { patientId },
      attributes: ['clinicId'],
    });
    const doctors = await DoctorRating.findAll({
      where: { patientId },
      attributes: ['doctorId'],
    });
    return { clinics, doctors };
  }

  public async addDoctorRating(payload: any): Promise<any> {
    const rating = await DoctorRating.create(payload);
    return rating;
  }

  public async addClinicRating(payload: any): Promise<any> {
    const rating = await ClinicRating.create(payload);
    return rating;
  }
}

export default new RatingService();
