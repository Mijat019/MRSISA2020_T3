import { Request, Response } from 'express'
import AuthenticationService from "../services/AuthenticationService";

class AuthenticationController {

    public async login(req : Request, res : Response) {
        try {
            const {username, password} = req.body;
            const user = await AuthenticationService.authenenticateUser(username, password);
            const token = await AuthenticationService.generateToken(user);
            res.send({username, token });
        }catch {
            res.status(400).send("Combination of email and password is incorrect");
        }
    }

    public async register(req : Request, res : Response) {

        try{
            const user = req.body;
            await AuthenticationService.registerUser(user);
            res.status(200).send("Registration was successfull");
        }catch {
            res.status(400).send("Email is already registered!")
        }
    }
}

export default new AuthenticationController();
