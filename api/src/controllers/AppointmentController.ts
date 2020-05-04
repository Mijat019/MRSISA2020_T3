import AppointmentService from "../services/AppointmentService";

class AppointmentController {
  public async getAllForDoctor(req: any, res: any) {
    try {
      const { doctorId } = req.params;
      const appointments = await AppointmentService.getAllForDoctor(doctorId);
      res.send(appointments) ;
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async addFreeApointment(req: any, res: any) {
    try{
      const newApp = await AppointmentService.addFreeAppointment(req.body);
      res.send(newApp);
    }catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async updateFreeApointment(req: any, res: any) {
    try{
      const newApp = await AppointmentService.updateFreeAppointment(req.body);
      res.send(newApp);
    }catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  public async deleteFreeApointment(req: any, res: any) {
    try{
      await AppointmentService.deleteFreeAppointment(req.body);
      res.send("Appointment successfully deleted.");
    }catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new AppointmentController();
