import confirmedAppointmentService from '../services/ConfirmedAppointmentService';

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

  public async add(req: any, res: any) {
    try {
      const confirmedAppointment = await confirmedAppointmentService.add(
        req.body
      );
      res.send(confirmedAppointment);
    } catch (error) {
      console.log(error);
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
      const { appointmentId } = req.params;
      await confirmedAppointmentService.delete(appointmentId);
      res.send('Confirmed appointment successfully deleted.');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async getAllForClinic(req: any, res: any) {}
}

export default new FreeAppointmentController();
