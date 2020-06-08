import Operations from '../models/Operations';

class OperationsServices {
  public async getAllForDoctor(doctorId: string) {
    const operations = await Operations.findAll({ where: { doctorId } });
    return operations;
  }

  public async add(operationPayload: any) {
    const operation = await Operations.create(operationPayload);
    return operation;
  }
}

export default new OperationsServices();
