import AdminAt from '../models/AdminAt';
import reportService from '../services/ReportService';

class ReportController {
  public async getIncome(req: any, res: any) {
    try {
      const { clinicId }: any = req.user;
      const income = await reportService.calculateIncome(clinicId, req.body);
      res.send({ income });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new ReportController();
