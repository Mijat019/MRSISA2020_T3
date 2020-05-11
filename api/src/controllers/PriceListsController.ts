import PriceListsService from "../services/PriceListsService";

class PriceListsController {
  public async getAllForClinic(req: any, res: any) {
    try {
      const { clinicId } = req.params;
      const lists = await PriceListsService.getAllForClinic(clinicId);
      res.send(lists);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async add(req: any, res: any) {
    try {
      const newPrice = await PriceListsService.add(req.body);
      res.send(newPrice);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      await PriceListsService.delete(id);
      res.send("Price list deleted.");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async update(req: any, res: any) {
    try {
      const { id } = req.params;
      const newPrice = await PriceListsService.update(id, req.body);
      res.send(newPrice);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new PriceListsController();
