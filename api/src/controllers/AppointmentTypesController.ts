import AppointmentTypesService from "../services/AppointmentTypesService";

class AppointmentTypesController {
  public async getAll(req: any, res: any) {
    try {
      const types = await AppointmentTypesService.getAll();
      res.send(types);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async add(req: any, res: any) {
    try {
      const newType = await AppointmentTypesService.add(req.body);
      res.send(newType);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      await AppointmentTypesService.delete(id);
      res.send("Appointment type deleted.");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async update(req: any, res: any) {
    try {
      const { id } = req.params;
      const newType = await AppointmentTypesService.update(id, req.body);
      res.send(newType);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new AppointmentTypesController();
