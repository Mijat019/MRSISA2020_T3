import DoctorAt from "../models/DoctorAt";
import Rooms from "../models/Rooms";
import Users, { usersSelect } from "../models/Users";
import AppointmentTypes from "../models/AppointmentTypes";
import FreeAppointments from "../models/FreeAppointments";
import ConfirmedAppointments from "../models/ConfirmedAppointments";
import ConfirmedAppointmentService from "./ConfirmedAppointmentService";
import PriceLists from "../models/PriceLists";
import { where } from "sequelize/types";

class FreeAppointmentService {
  private include = [
    { model: Rooms, as: "room", },
    {
      model: DoctorAt,
      as: "doctor",
      required: true,
      include: [
        { model: Users, as: "user", attributes: usersSelect, required: true, },
      ],
    },
    {
      model: PriceLists,
      as: "priceList",
      required: true,
      include: [
        { model: AppointmentTypes, as: "appointmentType", required: true, },
      ],
    },
  ];

  public async getAllForDoctor(doctorId: string) {
    const appointments = await FreeAppointments.findAll({
      where: { doctorId },
      include: this.include,
    });
    return appointments;
  }

  public async getAllOfType(typeId: string) {
    const appointments = await FreeAppointments.findAll({
      where: { priceListId: typeId },
      include: this.include,
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
    
    await this.checkForConflicts(appointmentPayload);
    const { id } = await FreeAppointments.create(appointmentPayload);
    const freeAppointment = FreeAppointments.findByPk(id, {
      include: this.include,
    });

    return freeAppointment;
  }

  public async update(id: number, appointmentPayload: any) {
    // Allocate appropriate appo type
    const priceList = await PriceLists.findOne({
      where: {
        id: appointmentPayload.priceListId,
      },
    });
    appointmentPayload.appointmentTypeId = priceList?.appointmentTypeId;

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
      include: this.include,
    });

    if (freeAppo == null) throw "Free appointment " + appoId + " not found.";

    // Make confirmed appointment from free
    const confAppo = await ConfirmedAppointmentService.createFromFree(
      freeAppo,
      userId
    );

    // Delete free appointment
    await FreeAppointments.destroy({ where: { id: freeAppo.id } });

    return confAppo;
  }

  public async checkForConflicts(appointment : any) {
    
    // first check if room is occupied
    const time = appointment.start;
    const room = appointment.roomId;

    if(await ConfirmedAppointments.findOne({where : {start : time, roomId : room}}) 
      || await FreeAppointments.findOne({where : {start : time, roomId : room}})) {
      throw new Error("Room is occupied at that time");
    }
    
    // now check if doctor is occupied
    const doctor = appointment.doctorId;

    if(await ConfirmedAppointments.findOne({where : {start : time, doctorId : doctor}}) 
      || await FreeAppointments.findOne({where : {start : time, doctorId : doctor}})) {
      throw new Error("Doctor is occupied at that time");
    }

  }
}

export default new FreeAppointmentService();
