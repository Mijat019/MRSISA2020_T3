import DoctorAt from '../models/DoctorAt';
import Rooms from '../models/Rooms';
import Users, { usersSelect } from '../models/Users';
import ConfirmedAppointments from '../models/ConfirmedAppointments';
import FreeAppointments from '../models/FreeAppointments';
import PriceLists from '../models/PriceLists';
import AppointmentTypes from '../models/AppointmentTypes';
import PatientMedicalRecord from '../models/PatientMedicalRecord';
import { IncludeOptions, Op } from 'sequelize';
import { getStartAndEndOfDay } from '../util/dateUtil';
import freeAppointmentService from './FreeAppointmentService';
import PatientAt from '../models/PatientAt';
import moment from 'moment';

const include: IncludeOptions[] = [
  { model: Rooms, as: 'room', attributes: ['name', 'id'] },
  {
    model: DoctorAt,
    as: 'doctor',
    attributes: [],
    include: [{ model: Users, as: 'user', attributes: usersSelect }],
  },
  {
    model: PriceLists,
    as: 'priceList',
    attributes: ['id', 'price'],
    include: [{ model: AppointmentTypes, as: 'appointmentType' }],
  },
  {
    model: PatientMedicalRecord,
    as: 'patient',
    attributes: ['bloodType', 'height', 'weight'],
    include: [{ model: Users, as: 'user', attributes: usersSelect }],
  },
];

const attributes: string[] = ['id', 'start', 'duration', 'finished'];

class ConfirmedAppointmentService {
  public async getAll() {
    const appointments = await ConfirmedAppointments.findAll({
      include,
    });
    return appointments;
  }

  public async getAllForDoctor(doctorId: string) {
    const appointments = await ConfirmedAppointments.findAll({
      where: { doctorId },
      attributes,
      include,
    });
    return appointments;
  }

  public async getAllUnfinishedForDoctorForToday(doctorId: string) {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(Date.now());
    const appointments = await ConfirmedAppointments.findAll({
      where: {
        doctorId,
        finished: false,
        start: { [Op.between]: [startOfDay, endOfDay] },
      },
      attributes,
      include,
      order: [['start', 'ASC']],
    });
    return appointments;
  }

  public async add(appointmentPayload: any): Promise<any> {
    freeAppointmentService.checkForConflicts(appointmentPayload);
    // Associate with clinic
    let { clinicId }: any = await PriceLists.findByPk(
      appointmentPayload.priceListId
    );
    appointmentPayload.clinicId = clinicId;

    const { id } = await ConfirmedAppointments.create(appointmentPayload);
    const appointment = await ConfirmedAppointments.findByPk(id, {
      include,
      attributes,
    });
    // Associate patient with clinic
    if (appointment) {
      const { clinicId }: any = await DoctorAt.findOne({
        where: { userId: appointmentPayload.doctorId },
      });
      await PatientAt.upsert({
        userId: appointmentPayload.patientId,
        clinicId,
      });
    }
    return appointment;
  }

  public async update(id: number, appointmentPayload: any) {
    await ConfirmedAppointments.update(appointmentPayload, {
      where: { id },
    });
    const updatedAppointment = await ConfirmedAppointments.findByPk(id, {
      include,
      attributes,
    });
    return updatedAppointment;
  }

  public async delete(id: any) {
    const confirmedAppointment = await ConfirmedAppointments.findByPk(id);
    if (!confirmedAppointment) {
      throw new Error('Wrong id');
    }

    const { start } = confirmedAppointment;
    if (start - moment().unix() < 24 * 60 * 60) {
      throw new Error('You cannot cancel this appointment.');
    }

    await ConfirmedAppointments.destroy({ where: { id } });
  }

  public async createFromFree(freeAppo: FreeAppointments, patientId: number) {
    // Associate with clinic
    let { clinicId }: any = await PriceLists.findByPk(freeAppo.priceListId);
    await ConfirmedAppointments.create({
      patientId,
      clinicId,
      priceListId: freeAppo.priceListId,
      doctorId: freeAppo.doctorId,
      roomId: freeAppo.roomId,
      start: freeAppo.start,
      duration: freeAppo.duration,
    });
  }
}

export default new ConfirmedAppointmentService();
