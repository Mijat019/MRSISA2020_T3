import AppointmentTypes from "../models/AppointmentTypes";
import PriceLists from "../models/PriceLists";

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
    const { version }: any = await AppointmentTypes.findByPk(typePayload.id);
    if (version != typePayload.version) {
      throw new Error("Optimistic lock error");
    }

    const priceLists: any = await PriceLists.findAll({ where: { appointmentTypeId: typePayload.id } });
    if (priceLists.length > 0) {
      throw new Error("Can't update: appointment type is in use.");
    }

    typePayload.version += 1;
    await AppointmentTypes.update(typePayload, {
      where: { id },
    });

    const updatedAppointmentType = await AppointmentTypes.findByPk(id);
    return updatedAppointmentType;
  }

  public async delete(id: any) {
    const priceLists: any = await PriceLists.findAll({ where: { appointmentTypeId: id } });
    if (priceLists.length > 0) {
      throw new Error("Can't delete: appointment type is in use.");
    }
    await AppointmentTypes.destroy({ where: { id: id } });
  }
}

export default new AppointmentTypesService();