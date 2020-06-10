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

  public async getNumberOfAppointments(req: any, res: any) {
    try {
      const appointmentCount = await reportService.getNumberOfFinishedAppointments(
        req.user.clinicId,
        req.body.dates
      );
      res.send(appointmentCount);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new ReportController();
