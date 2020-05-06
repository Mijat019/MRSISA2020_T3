import Drugs from "../models/Drugs";

class DrugsService {
  public async getAll() {
    const drugs = await Drugs.findAll();
    return drugs;
  }
}

export default new DrugsService();
