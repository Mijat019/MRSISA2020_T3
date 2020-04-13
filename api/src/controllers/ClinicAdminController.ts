import ClinicAdminService from "../services/ClinicAdminService";

class ClinicAdminController {
  public async getAll(req: any, res: any) {
    try {
      const clinicAdmins = await ClinicAdminService.getAll();
      return res.send(clinicAdmins);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  public async add(req: any, res: any) {
    try {
      const { clinicId, clinicAdminPayload } = req.body;
      const clinicAdmin = await ClinicAdminService.add(
        clinicAdminPayload,
        clinicId
      );
      return res.send(clinicAdmin);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

export default new ClinicAdminController();
