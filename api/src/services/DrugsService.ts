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

  public async update(id: string, drugUpdate: any) {
    await Drugs.update(drugUpdate, { where: { id } });
    const updatedDrug = await Drugs.findByPk(id);
    return updatedDrug;
  }

  public async delete(id: string) {
    await Drugs.destroy({ where: { id } });
  }
}

export default new DrugsService();
