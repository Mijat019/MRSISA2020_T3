import AppointmentService from "../services/AppointmentService";

class AppointmentController {
  public async getAllForDoctor(req: any, res: any) {
    try {
      const { doctorId } = req.params;
      const appointments = await AppointmentService.getAllForDoctor(doctorId);
      res.send(appointments);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new AppointmentController();
