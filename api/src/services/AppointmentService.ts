import Appointments from "../models/FreeAppointments";
import DoctorAt from "../models/DoctorAt";
import Rooms from "../models/Rooms";
import Users from "../models/Users";
import AppointmentTypes from '../models/AppointmentTypes'
import FreeAppointments from "../models/FreeAppointments";

class AppointmentService {
  public async getAllForDoctor(doctorId: string) {
    const appointments = await FreeAppointments.findAll({
      where: { DoctorAtUserId: doctorId },
      include: [Rooms, { model: DoctorAt, include: [Users] }, AppointmentTypes],
    });
    return appointments;
  }

  public async addFreeAppointment(appointmentPayload: any) {

    const newFreeApp = {
      AppointmentTypeId: appointmentPayload.appointmentType.id, 
      DoctorAtUserId: appointmentPayload.doctor.id,
      RoomId : appointmentPayload.room.id,
      start : appointmentPayload.start,
      duration : appointmentPayload.duration,
    };

    console.log('---------------------------')
    console.log(await FreeAppointments.create(newFreeApp));
    return await this.getFreeAppointment(appointmentPayload.start, appointmentPayload.room.id, appointmentPayload.doctor.id);
  }

  public async updateFreeAppointment(appointmentPayload: any) {
    const newFreeApp = {
      AppointmentTypeId: appointmentPayload.appointmentType.id, 
      DoctorAtUserId: appointmentPayload.doctor.id,
      RoomId : appointmentPayload.room.id,
      start : appointmentPayload.start,
      duration : appointmentPayload.duration,
     };
    await FreeAppointments.update(newFreeApp, { where: { id : appointmentPayload.id } });
    return await this.getFreeAppointment(appointmentPayload.start, appointmentPayload.room.id, appointmentPayload.doctor.id);
  }

  public async deleteFreeAppointment(appointmentPayload: any) {
    await FreeAppointments.destroy({ where: { id: appointmentPayload.id } });
  }

  public async getFreeAppointment(start : any, room : any, doctorId : any): Promise<any> {
    return await FreeAppointments.findOne({ 
      where: { start : start, RoomId : room, DoctorAtUserId : doctorId },
      include: [Rooms, { model: DoctorAt, include: [Users] }, AppointmentTypes], 
    });
    
  }

  public formatDate(date : any){
    date = date.split("T");
    const datePart = date[0];
    const hourPart = date[1].split(".")[0];
    return datePart + " " + hourPart;
  }

}

export default new AppointmentService();
