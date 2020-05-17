import AppointmentRequestsService from "../services/AppointmentRequestsService";

class AppointmentRequestsController {
  public async getAll(req: any, res: any) {
    try {
      const requests = await AppointmentRequestsService.getAll();
      res.send(requests);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getAllForClinic(req: any, res: any) {
    try {
      const { clinicId } = req.params;
      const appointments = await AppointmentRequestsService.getAllForClinic(
        clinicId
      );
      res.send(appointments);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async confirm(req: any, res: any) {
    try {
      const request = await AppointmentRequestsService.confirm(req.body);
      res.send(request);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async reject(req: any, res: any) {
    try {
      const request = await AppointmentRequestsService.reject(req.body);
      res.send(request);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async add(req: any, res: any) {
    try {
      const newRequest = await AppointmentRequestsService.add(req.body);
      res.send(newRequest);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      await AppointmentRequestsService.delete(id);
      res.send("Appointment request deleted.");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async update(req: any, res: any) {
    try {
      const { id } = req.params;
      const newRequest = await AppointmentRequestsService.update(id, req.body);
      res.send(newRequest);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new AppointmentRequestsController();
