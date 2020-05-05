import Rooms from "../models/Rooms";

class RoomsService {
  public async getAllForClinic(clinicId: number): Promise<any> {
    const rooms = await Rooms.findAll({ where: { clinicId } });
    return rooms;
  }

  public async add(roomPayload: any, clinicId: number): Promise<any> {
    roomPayload.clinicId = clinicId;
    const room = await Rooms.create(roomPayload);
    return room;
  }

  public async update(roomId: number, roomPayload: any): Promise<any> {
    await Rooms.update(roomPayload, { where: { id: roomId } });
    const updatedRoom = await Rooms.findOne({ where: { id: roomPayload.id } });
    return updatedRoom;
  }

  public async delete(id: number) {
    await Rooms.destroy({ where: { id } });
  }
}

export default new RoomsService();
