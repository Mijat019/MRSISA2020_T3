import Appointments from "../models/Appointments";

class AppointmentService {
  public async getAllForDoctor(doctorId: string) {
    const appointments = await Appointments.findAll({
      where: { DoctorId: doctorId },
    });
    return appointments;
  }
}

export default new AppointmentService();
