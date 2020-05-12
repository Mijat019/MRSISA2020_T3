import DoctorAt from "../models/DoctorAt";
import Rooms from "../models/Rooms";
import Users, { usersSelect } from "../models/Users";
import AppointmentTypes from "../models/AppointmentTypes";
import ConfirmedAppointments from "../models/ConfirmedAppointments";
import FreeAppointments from "../models/FreeAppointments";

class ConfirmedAppointmentService {
  private include = [
    { model: Rooms, as: "room" },
    {
      model: DoctorAt,
      as: "doctor",
      include: [{ model: Users, as: "user", attributes: usersSelect }],
    },
    { model: AppointmentTypes, as: "appointmentType" }
  ];

  public async getAll() {
    const appointments = await ConfirmedAppointments.findAll({
      include: this.include
    });
    return appointments;
  }

  public async update(id: number, appointmentPayload: any) {
    await ConfirmedAppointments.update(appointmentPayload, { where: { id } });
    const updatedAppointment = await ConfirmedAppointments.findByPk(id, {
      include: this.include,
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
      duration: freeAppo.duration
    });
  }

}

export default new ConfirmedAppointmentService();
