import Operations from '../models/Operations';
import { IncludeOptions } from 'sequelize/types';
import DoctorAt from '../models/DoctorAt';
import Users from '../models/Users';
import Rooms from '../models/Rooms';
import PatientMedicalRecord from '../models/PatientMedicalRecord';

const include: IncludeOptions[] = [
  {
    model: Operations,
    as: 'operations',
    required: true,
    attributes: ['id', 'start'],
    include: [
      { model: Rooms, as: 'room', attributes: ['name'], required: true },
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
];

class OperationsServices {
  public async getAllForDoctor(doctorId: string) {
    const doctorWithOperations = (await DoctorAt.findByPk(doctorId, {
      include,
    })) as any;
    return doctorWithOperations?.operations || [];
  }

  public async getAllForClinic(clinicId: string) {
    throw new Error('Not implemented');
  }

  public async add(operationPayload: any) {
    const operation = await Operations.create(operationPayload);
    return operation;
  }
}

export default new OperationsServices();
