import DoctorAt from "../models/DoctorAt";
import Rooms from "../models/Rooms";
import Users, { usersSelect } from "../models/Users";
import ConfirmedAppointments from "../models/ConfirmedAppointments";
import FreeAppointments from "../models/FreeAppointments";
import PriceLists from "../models/PriceLists";
import AppointmentTypes from "../models/AppointmentTypes";
import { IncludeOptions } from "sequelize/types";

const include: IncludeOptions[] = [
  { model: Rooms, as: "room" },
  {
    model: DoctorAt,
    as: "doctor",
    include: [{ model: Users, as: "user", attributes: usersSelect }],
  },
  {
    model: PriceLists,
    as: "priceList",
    include: [{ model: AppointmentTypes, as: "appointmentType" }],
  },
  { model: Users, as: "patient" },
];

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
      include,
    });
    return appointments;
  }

  public async getAllUnfinishedForDoctor(doctorId: string) {
    const appointments = await ConfirmedAppointments.findAll({
      where: { doctorId, finished: false },
      include,
      order: [["start", "ASC"]],
    });
    return appointments;
  }

  public async add(appoPayload: any): Promise<any> {
    const appointment = await ConfirmedAppointments.create(
      appoPayload
    );
    return appointment;
  }

  public async update(id: number, appointmentPayload: any) {
    await ConfirmedAppointments.update(appointmentPayload, { where: { id } });
    const updatedAppointment = await ConfirmedAppointments.findByPk(id, {
      include,
    });
    return updatedAppointment;
  }

  public async delete(id: any) {
    await ConfirmedAppointments.destroy({ where: { id } });
  }

  public async createFromFree(freeAppo: FreeAppointments, _userId: number) {
    await ConfirmedAppointments.create({
      priceListId: freeAppo.priceListId,
      doctorId: freeAppo.doctorId,
      userId: _userId,
      roomId: freeAppo.roomId,
      start: freeAppo.start,
      duration: freeAppo.duration,
    });
  }


}

export default new ConfirmedAppointmentService();
