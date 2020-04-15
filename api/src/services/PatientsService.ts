import UserRole from "../models/UserRole";
import UsersService from "../services/UsersService";
import config from "../config";
import bcrypt from "bcrypt";
import PatientRequest from '../models/PatientRequest'

class PatientsService {
  public async add(userPayload: any): Promise<any> {
    await UsersService.createUser(userPayload, UserRole.PATIENT);
  }
}

export default new PatientsService();
