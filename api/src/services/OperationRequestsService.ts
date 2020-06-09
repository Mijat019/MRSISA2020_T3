import OperationRequests from '../models/OperationRequests';
import DoctorAt from '../models/DoctorAt';
import Users from '../models/Users';
import PatientMedicalRecord from '../models/PatientMedicalRecord';

class OperationRequestsService {
  public async getAllForClinic(clinicId: string) {
    const operationRequests = await OperationRequests.findAll({
      where: { clinicId },
      include: [
        {
          model: DoctorAt,
          as: 'doctor',
          attributes: ['userId'],
          required: true,
          include: [
            {
              model: Users,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'email'],
            },
          ],
        },
        {
          model: PatientMedicalRecord,
          as: 'patientMedicalRecord',
          attributes: ['userId'],
          required: true,
          include: [
            {
              model: Users,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'email'],
            },
          ],
        },
      ],
    });
    return operationRequests;
  }

  public async add(operationRequestsPayload: any) {
    const operationRequest = await OperationRequests.create(
      operationRequestsPayload
    );
    return operationRequest;
  }

  public async remove(id: string) {
    await OperationRequests.destroy({ where: { id } });
  }
}

export default new OperationRequestsService();
