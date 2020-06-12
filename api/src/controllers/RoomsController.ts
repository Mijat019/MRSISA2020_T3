import RoomsService from '../services/RoomsService';

class RoomsController {
  public async getAllForClinic(req: any, res: any) {
    try {
      const { clinicId } = req.user;
      const rooms = await RoomsService.getAllForClinic(clinicId);
      res.send(rooms);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async getAvailableForClinic(req: any, res: any) {
    try {
      const { clinicId, date } = req.body;
      const rooms = await RoomsService.getAvailableForClinic(clinicId, date);
      res.send(rooms);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  public async getAvailableTimes(req: any, res: any) {
    try {
      const { roomId, date } = req.body;
      const times = await RoomsService.getAvailableTimes(roomId, date);
      res.send(times);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async add(req: any, res: any) {
    try {
      const newRoom = await RoomsService.add(req.body, req.user.clinicId);
      res.send(newRoom);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async update(req: any, res: any) {
    try {
      const newRoom = await RoomsService.update(req.params.id, req.body);
      res.send(newRoom);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      await RoomsService.delete(id);
      res.send('Room deleted.');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new RoomsController();
