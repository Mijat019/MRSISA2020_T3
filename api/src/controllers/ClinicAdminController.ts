import ClinicAdminService from "../services/ClinicAdminService";

class ClinicAdminController {
  public async getAll(req: any, res: any) {
    try {
      const clinicAdmins = await ClinicAdminService.getAll();
      res.send(clinicAdmins);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new ClinicAdminController();
