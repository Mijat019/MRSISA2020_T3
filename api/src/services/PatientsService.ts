import UserRole from "../models/UserRole";
import UsersService from "../services/UsersService";

class PatientsService {
  public async add(userPayload: any): Promise<any> {
    await UsersService.createUser(userPayload, UserRole.PATIENT);
  }
}

export default new PatientsService();
