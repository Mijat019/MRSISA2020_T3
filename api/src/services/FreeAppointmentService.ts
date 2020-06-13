import DoctorAt from '../models/DoctorAt';
import Rooms from '../models/Rooms';
import Users, { usersSelect } from '../models/Users';
import AppointmentTypes from '../models/AppointmentTypes';
import FreeAppointments from '../models/FreeAppointments';
import ConfirmedAppointments from '../models/ConfirmedAppointments';
import ConfirmedAppointmentService from './ConfirmedAppointmentService';
import PriceLists from '../models/PriceLists';
import { IncludeOptions } from 'sequelize/types';
import Clinics from '../models/Clinics';
import sequelize from './../models/database';

const include: IncludeOptions[] = [
  { model: Rooms, as: 'room' },
  {
    model: DoctorAt,
    as: 'doctor',
    required: true,
    include: [
      { model: Users, as: 'user', attributes: usersSelect, required: true },
    ],
  },
  {
    model: PriceLists,
    as: 'priceList',
    required: true,
    include: [
      { model: AppointmentTypes, as: 'appointmentType', required: true },
      { model: Clinics, as: 'clinic', attributes: ['name'], required: true },
    ],
  },
];
class FreeAppointmentService {
  public async getAllForDoctor(doctorId: string) {
    const appointments = await FreeAppointments.findAll({
      where: { doctorId },
      include,
    });
    return appointments;
  }

  public async getAllOfType(typeId: string) {
    const appointments = await FreeAppointments.findAll({
      where: { priceListId: typeId },
      include,
    });
    return appointments;
  }

  public async add(appointmentPayload: any) {
    // Allocate appropriate appo type
    const priceList = await PriceLists.findOne({
      where: {
        id: appointmentPayload.priceListId,
      },
    });
    appointmentPayload.appointmentTypeId = priceList?.appointmentTypeId;

    const { id } = await FreeAppointments.create(appointmentPayload);
    const freeAppointment = FreeAppointments.findByPk(id, {
      include,
    });

    return freeAppointment;
  }

  public async update(id: number, appointmentPayload: any) {
    try {
      return await sequelize.transaction(async (t) => {
        const { version } = (await FreeAppointments.findByPk(id)) as any;
        if (version > appointmentPayload.version)
          throw new Error('Optimistic Lock error');

        appointmentPayload.version += 1;
        await FreeAppointments.upsert(appointmentPayload);
        return await FreeAppointments.findByPk(id, {
          include,
        });
      });
    } catch (error) {
      // notify user of error and rollback
      throw new Error(error);
    }
  }

  public async delete(id: any) {
    await FreeAppointments.destroy({ where: { id } });
  }

  public async schedule(appoId: number, patientId: number) {
    // Get free appointment
    const freeAppo = await FreeAppointments.findByPk(appoId, {
      include,
    });

    if (freeAppo == null) throw 'Free appointment ' + appoId + ' not found.';

    // Make confirmed appointment from free
    const confAppo = await ConfirmedAppointmentService.createFromFree(
      freeAppo,
      patientId
    );

    // Delete free appointment
    await FreeAppointments.destroy({ where: { id: freeAppo.id } });

    return confAppo;
  }

}

export default new FreeAppointmentService();
