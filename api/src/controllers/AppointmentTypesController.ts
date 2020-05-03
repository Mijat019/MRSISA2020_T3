import ApointmentTypesService from '../services/AppointmentTypesService'

class AppointmentTypesController {
  public async getAll(req: any, res: any) {
    try {
      const types = await ApointmentTypesService.getAll();
      res.send(types);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async add(req: any, res: any) {
    try {
      const newType = await ApointmentTypesService.add(req.body);
      res.send(newType);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async delete(req: any, res: any) {
    try {
      await ApointmentTypesService.delete(req.body);
      res.send("Appointment type deleted.");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async update(req: any, res: any) {
    try {
      const newType = await ApointmentTypesService.update(req.body);
      res.send(newType);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new AppointmentTypesController();
