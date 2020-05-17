import { Request, Response } from "express";
import appointmentReportsService from "../services/AppointmentReportService";

class AppointmentReportController {
  public async getAllForPatient(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const appointmentReports = await appointmentReportsService.getAllForPatient(
        patientId
      );
      res.send(appointmentReports);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async add(req: Request, res: Response) {
    try {
      const appointmentReport = await appointmentReportsService.add(req.body);
      res.send(appointmentReport);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new AppointmentReportController();
