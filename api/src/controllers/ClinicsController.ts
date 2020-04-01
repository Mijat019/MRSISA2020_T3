import ClinicsService from "../services/ClinicsService";

class ClinicsController {
    public async getAll(req: any, res: any) {
        try {
            const clinics = await ClinicsService.getAll();
            res.send(clinics);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default new ClinicsController();
