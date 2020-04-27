import config from "../config";
import bcrypt from "bcrypt";
import Rooms from "../models/Rooms";

class RoomsService {
    public async getAll(): Promise<any> {
        const rooms = await Rooms.findAll();
        return rooms;
    }

    public async add(roomPayload: any): Promise<any> {
        const room = await Rooms.create(roomPayload);
        return room;
    }

    public async update(roomPayload: any): Promise<any> {
        await Rooms.update(roomPayload, { where : { id: roomPayload.id }});
        return await Rooms.findOne({ where: { id: roomPayload.id } });
    }

    public async delete(roomPayload: any) {
        await Rooms.destroy({ where: { id: roomPayload.id } });
    }
}

export default new RoomsService();
