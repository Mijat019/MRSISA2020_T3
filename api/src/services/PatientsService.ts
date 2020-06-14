import UserRole from '../models/UserRole';
import UsersService from '../services/UsersService';
import PatientAt from '../models/PatientAt';
import Users from '../models/Users';

class PatientsService {
  public async add(userPayload: any): Promise<any> {
    await UsersService.createUser(userPayload, UserRole.PATIENT);
  }

  public async getForClinic(clinicId: number): Promise<any> {
    const patients = await PatientAt.findAll({
      where: { clinicId },
      include: [{ model: Users, as: 'patient' }],
    });

    return patients;
  }
}

export default new PatientsService();
