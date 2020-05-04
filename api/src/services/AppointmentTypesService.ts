import AppointmentTypes from "../models/AppointmentTypes";

class AppointmentTypesService {
  public async getAllForClinic(clinicId: number): Promise<any> {
    const appointmentTypes = await AppointmentTypes.findAll({
      where: { clinicId },
    });
    return appointmentTypes;
  }

  public async add(clinicId: number, typePayload: any): Promise<any> {
    typePayload.clinicId = clinicId;
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

  public async delete(typePayload: any) {
    await AppointmentTypes.destroy({ where: { id: typePayload.id } });
  }
}

export default new AppointmentTypesService();
