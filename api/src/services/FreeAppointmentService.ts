import DoctorAt from "../models/DoctorAt";
import Rooms from "../models/Rooms";
import Users, { usersSelect } from "../models/Users";
import AppointmentTypes from "../models/AppointmentTypes";
import FreeAppointments from "../models/FreeAppointments";

class FreeAppointmentService {
  private include = [
    { model: Rooms, as: "room" },
    {
      model: DoctorAt,
      as: "doctor",
      include: [{ model: Users, as: "user", attributes: usersSelect }],
    },
    { model: AppointmentTypes, as: "appointmentType" },
  ];

  public async getAllForDoctor(doctorId: string) {
    const appointments = await FreeAppointments.findAll({
      where: { doctorId },
      include: this.include,
    });
    return appointments;
  }

  public async add(appointmentPayload: any) {
    const { id } = await FreeAppointments.create(appointmentPayload);
    const freeAppointment = FreeAppointments.findByPk(id, {
      include: this.include,
    });

    return freeAppointment;
  }

  public async update(id: number, appointmentPayload: any) {
    await FreeAppointments.update(appointmentPayload, { where: { id } });
    const updatedAppointment = await FreeAppointments.findByPk(id, {
      include: this.include,
    });
    return updatedAppointment;
  }

  public async delete(id: any) {
    await FreeAppointments.destroy({ where: { id } });
  }
}

export default new FreeAppointmentService();
