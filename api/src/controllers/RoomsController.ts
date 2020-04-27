import RoomsService from "../services/RoomsService";

class RoomsController {
    public async getAll(req: any, res: any) {
        try {
            const Rooms = await RoomsService.getAll();
            res.send(Rooms);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async add(req: any, res: any) {
        try {
            const newRoom = await RoomsService.add(req.body);
            res.send(newRoom);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async delete(req: any, res: any) {
        try {
            await RoomsService.delete(req.body);
            res.send("Room deleted.");
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async update(req: any, res: any) {
        try {
            const newRoom = await RoomsService.update(req.body);
            res.send(newRoom);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default new RoomsController();
