import ClinicsService from "../services/ClinicsService";

class ClinicsController {
  public async getAll(req: any, res: any) {
    try {
      const clinics = await ClinicsService.getAll();
      res.send(clinics);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async add(req: any, res: any) {
    try {
      const newClinic = await ClinicsService.add(req.body);
      res.send(newClinic);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async update(req: any, res: any) {
    try {
      const newClinic = await ClinicsService.update(req.body);
      res.send(newClinic);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async delete(req: any, res: any) {
    try {
      const { clinicId } = req.params;
      await ClinicsService.delete(clinicId);
      res.send("Clinic deleted");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new ClinicsController();
