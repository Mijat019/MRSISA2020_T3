import ConfirmedAppointmentService from "../services/ConfirmedAppointmentService";

class AppointmentController {
  public async getAll(req: any, res: any) {
    try {
      const appointments = await ConfirmedAppointmentService.getAll();
      res.send(appointments);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async getAllForDoctor(req: any, res: any) {
    try {
      const { doctorId } = req.params;
      const appointments = await ConfirmedAppointmentService.getAllForDoctor(
        doctorId
      );
      res.send(appointments);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async update(req: any, res: any) {
    try {
      const { id } = req.params;
      const updatedConfirmedAppointment = await ConfirmedAppointmentService.update(
        id,
        req.body
      );
      res.send(updatedConfirmedAppointment);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  public async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      await ConfirmedAppointmentService.delete(id);
      res.send("Confirmed appointment successfully deleted.");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new AppointmentController();
