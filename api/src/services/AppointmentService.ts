import Appointments from "../models/FreeAppointments";
import DoctorAt from "../models/DoctorAt";
import Rooms from "../models/Rooms";
import Users from "../models/Users";
import AppointmentTypes from "../models/AppointmentTypes";

class AppointmentService {
  public async getAllForDoctor(doctorId: string) {
    const appointments = await Appointments.findAll({
      where: { DoctorAtUserId: doctorId },
      include: [Rooms, { model: DoctorAt, include: [Users] }, AppointmentTypes],
    });
    return appointments;
  }
}

export default new AppointmentService();
