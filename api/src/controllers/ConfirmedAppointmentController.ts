import confirmedAppointmentService from "../services/ConfirmedAppointmentService";

class FreeAppointmentController {
  public async getAll(req: any, res: any) {
    try {
      const appointments = await confirmedAppointmentService.getAll();
      res.send(appointments);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async getAllForDoctor(req: any, res: any) {
    try {
      const { doctorId } = req.params;
      const appointments = await confirmedAppointmentService.getAllForDoctor(
        doctorId
      );
      res.send(appointments);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async getAllUnfinishedForDoctorForToday(req: any, res: any) {
    try {
      const { doctorId } = req.params;
      const appointments = await confirmedAppointmentService.getAllUnfinishedForDoctorForToday(
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
      const updatedConfirmedAppointment = await confirmedAppointmentService.update(
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
      await confirmedAppointmentService.delete(id);
      res.send("Confirmed appointment successfully deleted.");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new FreeAppointmentController();
