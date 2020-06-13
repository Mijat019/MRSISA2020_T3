import OperationAttendances from '../models/OperationAttendances';
import DoctorAt from '../models/DoctorAt';
import Users from '../models/Users';
import Operations from '../models/Operations';
import Rooms from '../models/Rooms';
import PatientMedicalRecord from '../models/PatientMedicalRecord';

class OperationAttendancesService {
  public async getAllForDoctor(doctorId: string) {
    const attendances = await DoctorAt.findByPk(doctorId, {
      include: [
        {
          model: OperationAttendances,
          as: 'operationAttendances',
          required: true,
          attributes: ['operationId'],
          include: [
            {
              model: Operations,
              as: 'operation',
              required: true,
              attributes: ['id', 'start'],
              include: [
                {
                  model: Rooms,
                  as: 'room',
                  attributes: ['name'],
                  required: true,
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
                      attributes: ['firstName', 'lastName'],
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    return attendances;
  }

  public async add(operationId: number, doctorIds: string[]) {
    for (let doctorId of doctorIds) {
      await OperationAttendances.create({ doctorId, operationId });
    }
  }
}

export default new OperationAttendancesService();
