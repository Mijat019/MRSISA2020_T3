import Operations from '../models/Operations';
import { IncludeOptions } from 'sequelize/types';
import DoctorAt from '../models/DoctorAt';
import Users from '../models/Users';
import Rooms from '../models/Rooms';
import PatientMedicalRecord from '../models/PatientMedicalRecord';
import operationRequestsService from '../services/OperationRequestsService';
import operationAttendancesService from '../services/OperationAttendancesService';
import sequelize from '../models/database';

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

  public async add(
    operationRequestId: string,
    operationPayload: any,
    doctorIds: any
  ) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const operation = await Operations.create(operationPayload, {
        transaction,
      });
      await operationAttendancesService.add(
        operation.id,
        doctorIds,
        transaction
      );

      await operationRequestsService.remove(operationRequestId, transaction);
      await transaction.commit();
      return operation;
    } catch (error) {
      // @ts-ignore
      if (transaction) await transaction.rollback();
      throw error;
    }
  }

  public async sendEmailsToDoctorsAndPatients(doctorIds: any, patient: any) {}
}

export default new OperationsServices();
