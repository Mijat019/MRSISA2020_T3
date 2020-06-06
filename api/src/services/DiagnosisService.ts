import Diagnosis from '../models/Diagnosis';
import AppointmentReports from '../models/AppointmentReports';

class DiagnosisService {
  public async getAll() {
    const diagnosis = await Diagnosis.findAll();
    return diagnosis;
  }

  public async add(diagnosisPayload: any) {
    const newDiagnosis = await Diagnosis.create(diagnosisPayload);
    return newDiagnosis;
  }

  public async update(id: string, diagnosisUpdate: any) {
    await Diagnosis.update(diagnosisUpdate, { where: { id } });
    const updatedDiagnosis = await Diagnosis.findByPk(id);
    return updatedDiagnosis;
  }

  public async delete(id: string) {
    const count = await AppointmentReports.count();
    if (count > 0) {
      throw Error('Cannot delete diagnosis');
    }

    await Diagnosis.destroy({ where: { id } });
  }
}

export default new DiagnosisService();
