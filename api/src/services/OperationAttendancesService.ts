import OperationAttendances from '../models/OperationAttendances';

class OperationAttendancesService {
  public async add(operationId: number, doctorIds: string[]) {
    for (let doctorId of doctorIds) {
      await OperationAttendances.create({ doctorId, operationId });
    }
  }
}

export default new OperationAttendancesService();
