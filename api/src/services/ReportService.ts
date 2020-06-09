import ConfirmedAppointments from '../models/ConfirmedAppointments';
import { Op } from 'sequelize';
import PriceLists from '../models/PriceLists';
import sequelize from 'sequelize';
import moment from 'moment';
import { getStartAndEndOfDay } from '../util/dateUtil';

class ReportService {
  public async getNumberOfFinishedAppointments(
    clinicId: string,
    startAndEnd: string[]
  ) {
    const daysInBetween = [];
    const appointmentCounts = [];
    const start = moment(startAndEnd[0]).startOf('day');
    const end = moment(startAndEnd[1]).startOf('day');
    let current = start;
    while (current <= end) {
      let { startOfDay, endOfDay } = getStartAndEndOfDay(current);
      let count = await ConfirmedAppointments.count({
        where: {
          clinicId,
          start: { [Op.between]: [startOfDay, endOfDay] },
          finished: true,
        },
      });
      // morao sam iz nekog razloga da dodam jedan dan
      // jer ovaj clone smanji jedan dan
      daysInBetween.push(current.clone().add(1, 'day'));
      appointmentCounts.push(count);

      current = current.add(1, 'day');
    }
    return { daysInBetween, appointmentCounts };
  }

  public async calculateIncome(clinicId: number, dates: any): Promise<any> {
    if (dates[0] > dates[1]) {
      throw 'First date must be smaller or equal to second date';
    }

    let { income }: any = await ConfirmedAppointments.findOne({
      where: {
        start: { [Op.between]: dates },
        clinicId,
      },

      include: [{ model: PriceLists, as: 'priceList', attributes: ['price'] }],

      attributes: [[sequelize.fn('sum', sequelize.col('price')), 'income']],

      raw: true,
    });

    if (income == null) {
      income = 0;
    }
    return income;
  }
}

export default new ReportService();
