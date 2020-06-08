import OperationRequests from '../models/OperationRequests';

class OperationRequestsService {
  public async getAllForClinic(clinicId: string) {
    const operationRequests = await OperationRequests.findAll({
      where: { clinicId },
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
