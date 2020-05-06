import Drugs from "../models/Drugs";

class DrugsService {
  public async getAll() {
    const drugs = await Drugs.findAll();
    return drugs;
  }

  public async add(drugPayload: any) {
    const newDrug = await Drugs.create(drugPayload);
    return newDrug;
  }
}

export default new DrugsService();
