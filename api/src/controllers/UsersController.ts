import { Request, Response } from 'express'
import UsersService from "../services/UsersService";


class UsersController {

    public async registerPatient(req : Request, res : Response) {

        try{
            const user = req.body;
            await UsersService.registerPatient(user);
            res.status(200).send("Registration was successfull");
        }catch {
            res.status(400).send("Email is already registered!")
        }
    }
}


export default new UsersController();