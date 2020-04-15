import { Request, Response } from "express";
import RegistrationReqService from "../services/RegistrationReqService";

class RegistrationReqController {
    public async register(req: Request, res: Response) {
        try {
            const user = req.body;
            await RegistrationReqService.register(user);
            res.send("Registration was successful");
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async confirm(req: Request, res: Response) {
        try {
            let email = req.params["email"];
            await RegistrationReqService.confirmRegistration(email);
            res.send("Approval successful");
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async reject(req: Request, res: Response) {
        try {
            let email = req.params["email"];
            await RegistrationReqService.rejectRegistration(email);
            res.send("Rejection successful");
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async activate(req: Request, res: Response) {
        try {
            let email = req.params["email"];
            await RegistrationReqService.activateRegistration(email);
            res.send("Activation successful");
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default new RegistrationReqController();
