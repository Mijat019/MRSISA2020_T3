import ClinicAdminService from "../services/ClinicAdminService";
import UsersService from "../services/UsersService";

class ClinicAdminController {
  public async getAll(req: any, res: any) {
    try {
      const clinicAdmins = await ClinicAdminService.getAll();
      console.log(req.user);
      return res.send(clinicAdmins);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  public async add(req: any, res: any) {
    try {
      const { clinicId, clinicAdminPayload } = req.body;
      // clinicAdmin is from junction table AdminOf
      const clinicAdmin = await ClinicAdminService.add(
        clinicAdminPayload,
        clinicId
      );
      UsersService.sendEmailWithLinkToSetPassword(clinicAdmin.User);
      return res.send(clinicAdmin);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

export default new ClinicAdminController();
