import DoctorsService from "../services/DoctorsService";
import UsersService from "../services/UsersService";
import UserRole from "../models/UserRole";


class DoctorsController {
  public async getAll(req: any, res: any) {
    try {
      const doctors = await DoctorsService.getAll();

      res.send(doctors);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async getByClinic(req: any, res: any) {
    try {
      // if (req.user.role != UserRole.CLINIC_ADMIN) {
      //   res.status(403).send("Only clinic admins may use this route.");
      //   return;
      // }
      const doctors = await DoctorsService.getByClinicId(req.params["clinicId"], req.user.id);

      res.send(doctors);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async getAllForScheduling(req: any, res: any){
    try{
      const {clinicId, appointmentTypeId, date } = req.body;
      const doctors = await DoctorsService.getAllForScheduling(clinicId, appointmentTypeId, date);
      res.send(doctors);
    } catch(error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async getAvailableTimes(req: any, res: any){
    try{
      const {doctorId, date } = req.body;
      const times = await DoctorsService.getAvailableTimes(doctorId, date);
      res.send(times);
    } catch(error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async add(req: any, res: any) {
    try {
      const newDoctor = await DoctorsService.add(req.body, req.user.clinicId);
      res.send(newDoctor);
    } catch (error) {
      console.log(error);
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

  // SPECIALIZATIONS
  public async addSpecialization(req: any, res: any) {
    try {
      const newSpec = await DoctorsService.addSpecialization(req.body.doctorId, req.body.appoTypeId);
      res.send(newSpec);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async deleteSpecialization(req: any, res: any) {
    try {
      await DoctorsService.deleteSpecialization(req.params["doctorId"], req.params["appoTypeId"]);
      res.send();
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

export default new DoctorsController();
