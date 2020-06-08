import operationRequestsService from '../services/OperationRequestsService';

class OperationRequestsController {
  public async getAllForClinic(req: any, res: any) {
    try {
      const { clinicId } = req.params;
      const operationRequests = await operationRequestsService.getAllForClinic(
        clinicId
      );
      return operationRequests;
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async add(req: any, res: any) {
    try {
      const operationRequests = await operationRequestsService.add(req.body);
      return operationRequests;
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new OperationRequestsController();
