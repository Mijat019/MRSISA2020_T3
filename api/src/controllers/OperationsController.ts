import operationsService from '../services/OperationsService';
import operationRequestsService from '../services/OperationRequestsService';

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

  public async createOperationFromOperationRequest(req: any, res: any) {
    try {
      const operation = await operationsService.add(req.body);
      const { operationRequestId } = req.params;
      await operationRequestsService.remove(operationRequestId);
      res.send(operation);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new OperationsController();
