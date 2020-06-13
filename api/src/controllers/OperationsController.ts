import operationsService from '../services/OperationsService';
import operationRequestsService from '../services/OperationRequestsService';
import operationAttendancesService from '../services/OperationAttendancesService';

class OperationsController {
  public async getAllForDoctor(req: any, res: any) {
    try {
      const { doctorId } = req.params;
      const operations = await operationsService.getAllForDoctor(doctorId);
      res.send(operations);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async getAllForClinic(req: any, res: any) {
    try {
      const { clinicId } = req.params;
      const operations = await operationsService.getAllForClinic(clinicId);
      res.send(operations);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async createOperationFromOperationRequest(req: any, res: any) {
    try {
      const { operationPayload, doctorIds } = req.body;
      const operation = await operationsService.add(operationPayload);
      await operationAttendancesService.add(operation.id, doctorIds);

      const { operationRequestId } = req.params;
      await operationRequestsService.remove(operationRequestId);
      res.send(operation);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new OperationsController();
