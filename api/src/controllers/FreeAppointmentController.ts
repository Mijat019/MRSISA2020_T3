import FreeAppointmentService from "../services/FreeAppointmentService";

class AppointmentController {
  public async getAllForDoctor(req: any, res: any) {
    try {
      const { doctorId } = req.params;
      const appointments = await FreeAppointmentService.getAllForDoctor(
        doctorId
      );
      res.send(appointments);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async add(req: any, res: any) {
    try {
      const newFreeAppointment = await FreeAppointmentService.add(req.body);
      res.send(newFreeAppointment);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  public async update(req: any, res: any) {
    try {
      const { id } = req.params;
      const updatedFreeAppointment = await FreeAppointmentService.update(
        id,
        req.body
      );
      res.send(updatedFreeAppointment);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  public async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      await FreeAppointmentService.delete(id);
      res.send("Appointment successfully deleted.");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new AppointmentController();
