import DoctorsService from "../services/DoctorsService";
import UsersService from "../services/UsersService";

class DoctorsController {
  public async getAll(req: any, res: any) {
    try {
      const doctors = await DoctorsService.getAll();

      res.send(doctors);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async add(req: any, res: any) {
    try {
      const newDoctor = await DoctorsService.add(req.body, req.user.clinicId);
      res.send(newDoctor);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async delete(req: any, res: any) {
    try {
      await DoctorsService.delete(req.params["id"]);
      res.send("Doctor deleted.");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async update(req: any, res: any) {
    try {
      const newDoctor = await DoctorsService.update(req.body);
      res.send(newDoctor);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new DoctorsController();
