import Operations from '../models/Operations';
import { IncludeOptions } from 'sequelize/types';
import DoctorAt from '../models/DoctorAt';
import Users from '../models/Users';
import Rooms from '../models/Rooms';
import PatientMedicalRecord from '../models/PatientMedicalRecord';
import { attempt } from 'joi';

const include: IncludeOptions[] = [
  {
    model: DoctorAt,
    as: 'doctor',
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
];

const attributes = ['id', 'start'];

class OperationsServices {
  public async getAllForDoctor(doctorId: string) {
    const operations = await Operations.findAll({
      where: { doctorId },
      attributes,
      include,
    });
    return operations;
  }

  public async getAllForClinic(clinicId: string) {
    const operations = await Operations.findAll({
      where: { clinicId },
      attributes,
      include,
    });
    return operations;
  }

  public async add(operationPayload: any) {
    const operation = await Operations.create(operationPayload);
    return operation;
  }
}

export default new OperationsServices();
