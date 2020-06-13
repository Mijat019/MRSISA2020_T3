import OperationAttendancesService from '../services/OperationAttendancesService';

class OperationAttendancesController {
  public async getAllForDoctor(req: any, res: any) {
    try {
      const { doctorId } = req.params;
      const attendances = await OperationAttendancesService.getAllForDoctor(
        doctorId
      );
      res.send(attendances);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new OperationAttendancesController();
