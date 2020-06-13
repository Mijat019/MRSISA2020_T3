import ratingService from '../services/RatingsService';

class RatingsController {
  public async getClinicRating(req: any, res: any) {
    try {
      const { clinicId } = req.user;
      const rating = await ratingService.getRatingForClinic(clinicId);
      res.send({ rating });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getRatedClinicsAndDoctors(req: any, res: any) {
    try {
      const { patientId } = req.params;
      const ids = await ratingService.getRatedClinicsAndDoctors(patientId);
      res.send(ids);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async addDoctorRating(req: any, res: any) {
    try {
      const rating = await ratingService.addDoctorRating(req.body);
      res.send(rating);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async addClinicRating(req: any, res: any) {
    try {
      const rating = await ratingService.addClinicRating(req.body);
      res.send(rating);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new RatingsController();
