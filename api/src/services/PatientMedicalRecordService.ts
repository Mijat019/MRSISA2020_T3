import PatientMedicalRecord from "../models/PatientMedicalRecord";
import { IncludeOptions } from "sequelize/types";
import Users, { usersSelect } from "../models/Users";

const include: IncludeOptions[] = [
  { model: Users, as: "user", attributes: usersSelect },
];

class PatientMedicalRecordService {
  public async get(userId: string) {
    const patientMedicalRecord = await PatientMedicalRecord.findByPk(userId, {
      include,
    });
    return patientMedicalRecord;
  }

  public async update(userId: string, patientMedicalRecordUpdate: any) {
    await PatientMedicalRecord.update(patientMedicalRecordUpdate, {
      where: { userId },
    });
    const patientMedicalRecord = await PatientMedicalRecord.findByPk(userId, {
      include,
    });
    return patientMedicalRecord;
  }
}

export default new PatientMedicalRecordService();
