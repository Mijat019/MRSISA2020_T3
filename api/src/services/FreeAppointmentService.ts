import DoctorAt from "../models/DoctorAt";
import Rooms from "../models/Rooms";
import Users, { usersSelect } from "../models/Users";
import AppointmentTypes from "../models/AppointmentTypes";
import FreeAppointments from "../models/FreeAppointments";
import ConfirmedAppointments from "../models/ConfirmedAppointments";
import ConfirmedAppointmentService from "./ConfirmedAppointmentService";
import PriceLists from "../models/PriceLists";

class FreeAppointmentService {
  private include = [
    { model: Rooms, as: "room" },
    {
      model: DoctorAt,
      as: "doctor",
      include: [{ model: Users, as: "user", attributes: usersSelect }],
    },
    { model: AppointmentTypes, as: "appointmentType" }
  ];

  public async getAllForDoctor(doctorId: string) {
    const appointments = await FreeAppointments.findAll({
      where: { doctorId },
      include: this.include
    });
    return appointments;
  }

  public async getAllOfType(typeId: string) {
    const appointments = await FreeAppointments.findAll({
      where: { appointmentTypeId: typeId },
      include: this.include
    });
    return appointments;
  }

  public async add(appointmentPayload: any) {
    // If no appo type was sent, allocate it
    if (appointmentPayload.appointmentTypeId == undefined || appointmentPayload.appointmentTypeId == null) {
      const priceList = await PriceLists.findByPk(appointmentPayload.priceListId);
      appointmentPayload.appointmentTypeId = priceList?.appointmentTypeId;
    }

    const { id } = await FreeAppointments.create(appointmentPayload);
    const freeAppointment = FreeAppointments.findByPk(id, {
      include: this.include,
    });

    return freeAppointment;
  }

  public async update(id: number, appointmentPayload: any) {
    // If no appo type was sent, allocate it
    if (appointmentPayload.appointmentTypeId == undefined || appointmentPayload.appointmentTypeId == null) {
      const priceList = await PriceLists.findByPk(appointmentPayload.priceListId);
      appointmentPayload.appointmentTypeId = priceList?.appointmentTypeId;
    }

    await FreeAppointments.update(appointmentPayload, { where: { id } });
    const updatedAppointment = await FreeAppointments.findByPk(id, {
      include: this.include,
    });
    return updatedAppointment;
  }

  public async delete(id: any) {
    await FreeAppointments.destroy({ where: { id } });
  }

  public async schedule(appoId: number, userId: number) {
    // Get free appointment
    const freeAppo = await FreeAppointments.findByPk(appoId, {
      include: this.include
    });

    if (freeAppo == null) throw "Free appointment " + appoId + " not found.";

    // Make confirmed appointment from free
    const confAppo = await ConfirmedAppointmentService.createFromFree(freeAppo, userId);

    // Delete free appointment
    await FreeAppointments.destroy({ where: { id: freeAppo.id } });

    return confAppo;
  }
}

export default new FreeAppointmentService();
