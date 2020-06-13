import AppointmentTypes from "../models/AppointmentTypes";

class AppointmentTypesService {
  public async getAll(): Promise<any> {
    const appointmentTypes = await AppointmentTypes.findAll({});
    return appointmentTypes;
  }

  public async add(typePayload: any): Promise<any> {
    const appointmentType = await AppointmentTypes.create(typePayload);
    return appointmentType;
  }

  public async update(id: number, typePayload: any): Promise<any> {
    await AppointmentTypes.update(typePayload, {
      where: { id },
    });

    const updatedAppointmentType = await AppointmentTypes.findByPk(id);
    return updatedAppointmentType;
  }

  public async delete(id: any) {
    await AppointmentTypes.destroy({ where: { id: id } });
  }
}

export default new AppointmentTypesService();