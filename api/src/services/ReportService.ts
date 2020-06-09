import UserRole from '../models/UserRole';
import UsersService from './UsersService';
import config from '../config';
import bcrypt from 'bcrypt';
import PatientRequest from '../models/PatientRequest';
import PatientAt from '../models/PatientAt';
import Users from '../models/Users';
import ConfirmedAppointments from '../models/ConfirmedAppointments';
import { Op } from 'sequelize';
import PriceLists from '../models/PriceLists';
import sequelize from 'sequelize';

class IncomeReportService {
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

export default new IncomeReportService();
