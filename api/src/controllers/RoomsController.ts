import RoomsService from "../services/RoomsService";

class RoomsController {
  public async getAllForClinic(req: any, res: any) {
    try {
      const { clinicId } = req.user;
      const rooms = await RoomsService.getAllForClinic(clinicId);
      res.send(rooms);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async add(req: any, res: any) {
    try {
      const newRoom = await RoomsService.add(req.body, req.user.clinicId);
      res.send(newRoom);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async update(req: any, res: any) {
    try {
      const newRoom = await RoomsService.update(req.params.id, req.body);
      res.send(newRoom);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async delete(req: any, res: any) {
    try {
      await RoomsService.delete(req.params.id);
      res.send("Room deleted.");
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new RoomsController();
