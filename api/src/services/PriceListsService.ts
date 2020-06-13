import PriceLists from '../models/PriceLists';
import AppointmentTypes from '../models/AppointmentTypes';
import { appTypesSelect } from '../models/AppointmentTypes';
import { IncludeOptions } from 'sequelize/types';
import DoctorSpec from '../models/DoctorSpec';
import sequelize from './../models/database';

const include: IncludeOptions[] = [
  {
    model: AppointmentTypes,
    as: 'appointmentType',
    attributes: appTypesSelect,
    required: true,
  },
];

class PriceListsService {
  public async getAllForClinic(clinicId: any): Promise<any> {
    const priceLists = await PriceLists.findAll({
      where: { clinicId: clinicId },
      include,
    });
    return priceLists;
  }

  public async getAllForDoctor(clinicId: string, userId: string) {
    const priceLists = await DoctorSpec.findAll({
      where: { userId },
      attributes: [],
      include: [
        {
          model: AppointmentTypes,
          as: 'appoType',
          attributes: ['name'],
          required: true,
          include: [
            {
              model: PriceLists,
              as: 'priceList',
              where: { clinicId },
              required: true,
              attributes: ['id', 'price'],
            },
          ],
        },
      ],
    });
    return priceLists;
  }

  public async add(pricePayload: any): Promise<any> {
    await PriceLists.create(pricePayload);

    const price = await PriceLists.findOne({
      where: {
        clinicId: pricePayload.clinicId,
        appointmentTypeId: pricePayload.appointmentTypeId,
      },
      include,
    });
    return price;
  }

  public async update(id: number, typePayload: any): Promise<any> {
    try {
      return await sequelize.transaction(async (t) => {
        const { version } :any = await PriceLists.findByPk(id, {transaction: t});
        if (version > typePayload.version)
          throw new Error('Optimistic Lock error');

        typePayload.version += 1;
        await PriceLists.upsert(typePayload, {transaction: t});

        return await PriceLists.findByPk(id, {transaction: t});
      });
    } catch (error) {
      // notify user of error and rollback
      throw new Error(error);
    }
  }

  public async delete(id: any) {
    await PriceLists.destroy({ where: { id: id } });
  }
}

export default new PriceListsService();
