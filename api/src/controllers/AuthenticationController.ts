import { Request, Response } from 'express'
import AuthenticationService from "../services/AuthenticationService";

class AuthenticationController {

    public async login(req : Request, res : Response) {
        try {
            const {email, password} = req.body;
            const user = await AuthenticationService.authenenticateUser(email, password);
            const token = await AuthenticationService.generateToken(user);
            res.send({ token });
        }catch {
            res.status(400).send("Combination of email and password is incorrect");
        }
    }
}

export default new AuthenticationController();
