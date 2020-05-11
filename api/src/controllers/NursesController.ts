import NursesService from "../services/NursesService";
import UsersService from "../services/UsersService";
import UserRole from "../models/UserRole";

class NursesController {
  public async getAll(req: any, res: any) {
    try {
      const Nurses = await NursesService.getAll();
      res.send(Nurses);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getByClinic(req: any, res: any) {
    try {
      if (req.user.role != UserRole.CLINIC_ADMIN) {
        res.status(403).send("Only clinic admins may use this route.");
        return;
      }
      const doctors = await NursesService.getByClinicId(req.params["clinicId"], req.user.id);

      res.send(doctors);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async add(req: any, res: any) {
    try {
      const newNurse = await NursesService.add(req.body, req.user.clinicId);
      res.send(newNurse);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async delete(req: any, res: any) {
    try {
      await NursesService.delete(req.params["id"]);
      res.send("Nurse deleted.");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async update(req: any, res: any) {
    try {
      const newNurse = await NursesService.update(req.body);
      res.send(newNurse);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new NursesController();
