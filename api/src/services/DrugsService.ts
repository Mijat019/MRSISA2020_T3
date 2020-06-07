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
    const { version } = (await Drugs.findByPk(id)) as any;
    if (version > drugUpdate.version) throw new Error('Optimistic Lock error');

    drugUpdate.version += 1;
    await Drugs.upsert(drugUpdate);
    return await Drugs.findByPk(id);
  }

  public async delete(id: string) {
    await Drugs.destroy({ where: { id } });
  }
}

export default new DrugsService();
