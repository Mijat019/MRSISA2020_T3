import DoctorsService from "../services/DoctorsService";

class DoctorsController {
    public async getAll(req: any, res: any) {
        try {
            const doctors = await DoctorsService.getAll();
            res.send(doctors);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async add(req: any, res: any) {
        try {
            const newDoctor = await DoctorsService.add(req.body);
            res.send(newDoctor);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default new DoctorsController();
