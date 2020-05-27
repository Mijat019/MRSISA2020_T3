import RatingsService from '../services/RatingsService'


class RatingsController {
//   public async getAllForClinic(req: any, res: any) {
//     try {
//       const { clinicId } = req.user;
//       const rooms = await RoomsService.getAllForClinic(clinicId);
//       res.send(rooms);
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   }


  public async addDoctorRating(req: any, res: any) {
    try {
      const rating = await RatingsService.addDoctorRating(req.body);
      res.send(rating);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async addClinicRating(req: any, res: any) {
    try {
      const rating = await RatingsService.addClinicRating(req.body);
      res.send(rating);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new RatingsController();
