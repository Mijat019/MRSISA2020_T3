import PriceLists from "../models/PriceLists";
import AppointmentTypes from '../models/AppointmentTypes'
import  { appTypesSelect } from '../models/AppointmentTypes'

class PriceListsService {
  public async getAllForClinic(clinicId : any): Promise<any> {
    const priceLists = await PriceLists.findAll({
        where: { clinicId : clinicId },
        include: [
            { model: AppointmentTypes, as: "appointmentType", attributes: appTypesSelect },
        ],
    });
    return priceLists;
  }

  public async add(pricePayload: any): Promise<any> {
    const price = await PriceLists.create(pricePayload);

    return await PriceLists.findOne({
        where: { clinicId : pricePayload.clinicId, appointmentTypeId : pricePayload.appointmentTypeId },
        include: [
            { model: AppointmentTypes, as: "appointmentType", attributes: appTypesSelect },
        ],
    })
  }

  public async update(id: number, typePayload: any): Promise<any> {
    await PriceLists.update(typePayload, {
      where: { id },
    });

    return await PriceLists.findOne({
        where: { id : id },
        include: [
            { model: AppointmentTypes, as: "appointmentType", attributes: appTypesSelect },
        ],
    })

    // const updatedAppointmentType = await PriceLists.findByPk(id);
    // return updatedAppointmentType;
  }

  public async delete(id: any) {
    await PriceLists.destroy({ where: { id: id } });
  }
}

export default new PriceListsService();
