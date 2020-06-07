import Rooms from "../models/Rooms";
import sequelize from './../models/database';

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
    
    const {version} = await Rooms.findByPk(roomId) as any;
    if(version > roomPayload.version)
      throw new Error("Optimistic Lock error");
  
    roomPayload.version += 1;
    await Rooms.upsert(roomPayload);
    return await Rooms.findByPk(roomId);
  }

  public async delete(id: number) {
    await Rooms.destroy({ where: { id } });
  }
}

export default new RoomsService();
