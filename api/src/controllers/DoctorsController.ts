import doctorsService from '../services/DoctorsService';

class DoctorsController {
  public async getAll(req: any, res: any) {
    try {
      const doctors = await doctorsService.getAll();

      res.send(doctors);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async getByClinic(req: any, res: any) {
    try {
      const doctors = await doctorsService.getByClinicId(
        req.params['clinicId']
      );

      res.send(doctors);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async getAllForScheduling(req: any, res: any) {
    try {
      const { clinicId, appointmentTypeId, date } = req.body;
      const doctors = await doctorsService.getAllForScheduling(
        clinicId,
        appointmentTypeId,
        date
      );
      res.send(doctors);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async getAvailableTimes(req: any, res: any) {
    try {
      const { doctorId, date } = req.body;
      const times = await doctorsService.getAvailableTimes(doctorId, date);
      res.send(times);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async add(req: any, res: any) {
    try {
      const newDoctor = await doctorsService.add(req.body, req.user.clinicId);
      res.send(newDoctor);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async delete(req: any, res: any) {
    try {
      await doctorsService.delete(req.params['id']);
      res.send('Doctor deleted.');
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // SPECIALIZATIONS
  public async addSpecialization(req: any, res: any) {
    try {
      const newSpec = await doctorsService.addSpecialization(
        req.body.doctorId,
        req.body.appoTypeId
      );
      res.send(newSpec);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async deleteSpecialization(req: any, res: any) {
    try {
      await doctorsService.deleteSpecialization(
        req.params['doctorId'],
        req.params['appoTypeId']
      );
      res.send();
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async getAvailableDoctors(req: any, res: any) {
    try {
      const { clinicId, start } = req.params;
      const availableDoctors = await doctorsService.getAvailableDoctors(
        clinicId,
        start
      );
      res.send(availableDoctors);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

export default new DoctorsController();
