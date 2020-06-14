import OperationRequests from '../models/OperationRequests';
import DoctorAt from '../models/DoctorAt';
import Users from '../models/Users';
import PatientMedicalRecord from '../models/PatientMedicalRecord';
import Operations from '../models/Operations';
import FreeAppointments from '../models/FreeAppointments';
import ConfirmedAppointments from '../models/ConfirmedAppointments';

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

  public async add(operationRequestPayload: any) {
    const { start, doctorId } = operationRequestPayload;
    const operationsCount = await Operations.count({
      where: { start, doctorId },
    });
    const freeAppointmentsCount = await FreeAppointments.count({
      where: { start, doctorId },
    });
    const confirmedAppointmentsCount = await ConfirmedAppointments.count({
      where: { start, doctorId },
    });
    if (
      operationsCount ||
      freeAppointmentsCount ||
      confirmedAppointmentsCount
    ) {
      throw new Error('Doctor is busy');
    }

    const operationRequest = await OperationRequests.create(
      operationRequestPayload
    );
    return operationRequest;
  }

  public async remove(id: string, transaction: any) {
    await OperationRequests.destroy({ where: { id }, transaction });
  }
}

export default new OperationRequestsService();
