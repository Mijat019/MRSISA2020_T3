import Rooms from '../models/Rooms';
import sequelize from './../models/database';
import FreeAppointments from '../models/FreeAppointments';
import { Op } from 'sequelize';
import ConfirmedAppointments from '../models/ConfirmedAppointments';
import DoctorsService from './DoctorsService';
import moment from 'moment';
import Operations from '../models/Operations';

class RoomsService {
  public async getAllForClinic(clinicId: number): Promise<any> {
    const rooms = await Rooms.findAll({ where: { clinicId } });
    return rooms;
  }

  public async getOccupancies(roomId: number): Promise<any> {
    const occupancies: any = await Rooms.findByPk(roomId, {
      include: [
        { model: FreeAppointments, attributes: ['start'], as: 'freeAppointments' },
        { model: ConfirmedAppointments, attributes: ['start'], as: 'confirmedAppointments' },
        { model: Operations, attributes: ['start'], as: 'operations' },
      ]
    });

    return occupancies;
  }

  public async getAvailableForClinic(
    clinicId: number,
    start: any
  ): Promise<any> {
    // find all taken rooms
    let occupiedRooms = await FreeAppointments.findAll({
      attributes: ['roomId'],
      where: { clinicId, start },
    });
    let occupiedIds = occupiedRooms.map((app) => app.roomId);

    // now do the same for conf appos
    const occupiedRoomsConf = await ConfirmedAppointments.findAll({
      attributes: ['roomId'],
      where: { clinicId, start },
    });
    occupiedIds = occupiedIds.concat(
      occupiedRoomsConf.map((app) => app.roomId)
    );

    const occupiedRoomsOperations = await Operations.findAll({
      attributes: ['roomId'],
      where: { clinicId, start },
    });
    occupiedIds = occupiedIds.concat(
      occupiedRoomsOperations.map((op) => op.roomId)
    );

    // return all clinic rooms minus those who are occupied
    const availableRooms = await Rooms.findAll({
      where: { clinicId, id: { [Op.notIn]: occupiedIds } },
    });

    return availableRooms;
  }

  public async add(roomPayload: any, clinicId: number): Promise<any> {
    roomPayload.clinicId = clinicId;
    const room = await Rooms.create(roomPayload);
    return room;
  }

  public async update(roomId: number, roomPayload: any): Promise<any> {
    const { version } = (await Rooms.findByPk(roomId)) as any;
    if (version > roomPayload.version) throw new Error('Optimistic Lock error');

    roomPayload.version += 1;
    await Rooms.upsert(roomPayload);
    return await Rooms.findByPk(roomId);
  }

  public async delete(id: number) {
    await Rooms.destroy({ where: { id } });
  }

  /** Returns a list of all available times for doctor given the date */
  public async getAvailableTimes(roomId: any, date: any) {
    date = moment.unix(date);

    // generate all possible times
    let allTimes = ['09:00', '09:30'];
    for (let i = 10; i < 17; i++) {
      allTimes.push(i + ':' + '00');
      allTimes.push(i + ':' + '30');
    }

    // set time bounds
    // (min = date at 9AM, max = date at 5PM)
    const minTime = date.clone().set({ hour: 9, minute: 0, second: 0 });
    const maxTime = date.clone().set({ hour: 17, minute: 0, second: 0 });

    //get all free Appos
    const freeApps = await FreeAppointments.findAll({
      where: {
        roomId,
        start: {
          [Op.between]: [minTime.unix(), maxTime.unix()],
        },
      },
    });

    // delete busy times
    DoctorsService.parseApposAndDeleteTimes(freeApps, allTimes);

    //get all conf appos
    const confApps = await ConfirmedAppointments.findAll({
      where: {
        roomId,
        start: {
          [Op.between]: [minTime.unix(), maxTime.unix()],
        },
      },
    });

    // delete busy times
    DoctorsService.parseApposAndDeleteTimes(confApps, allTimes);

    console.log(allTimes);
    return allTimes;
  }
}

export default new RoomsService();
