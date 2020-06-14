import operationsService from '../services/OperationsService';

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
      const { operationPayload, doctorIds } = req.body;
      const { operationRequestId } = req.params;
      const operation = await operationsService.add(
        operationRequestId,
        operationPayload,
        doctorIds
      );
      res.send(operation);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new OperationsController();
