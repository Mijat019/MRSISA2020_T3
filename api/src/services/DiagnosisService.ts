import Diagnosis from "../models/Diagnosis";

class DiagnosisService {
  public async getAll() {
    const diagnosis = await Diagnosis.findAll();
    return diagnosis;
  }
}

export default new DiagnosisService();
