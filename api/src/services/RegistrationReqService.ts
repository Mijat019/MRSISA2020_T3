import UserRole from "../models/UserRole";
import AccountStatus from "../models/AccountStatus";
import UsersService from "../services/UsersService";
import config from "../config";
import bcrypt from "bcrypt";
import PatientRequest from "../models/PatientRequest";

class RegistrationReqService {
    // Creates a request for registration
    public async register(userPayload: any): Promise<any> {
        // check if there is already registered user with address
        let exists = await UsersService.getUser(userPayload.email);
        if (exists)
            throw new Error("User with that email address already exists!");

        userPayload.accountStatus = AccountStatus.PENDING;
        userPayload.password = await bcrypt.hash(
            userPayload.password,
            config.saltRounds
        );
        const user = await PatientRequest.create(userPayload);
        return user;
    }

    // after admin confirmation
    // adds patient from request to patients table
    public async confirmRegistration(email: string): Promise<any> {
        let req = await this.getRequest(email);

        if (!req) throw new Error("Email does not exist");

        if (
            req.accountStatus == AccountStatus.ACTIVATED ||
            req.accountStatus == AccountStatus.APPROVED
        )
            throw new Error("Account already activated");

        //change account status in requstes to approved
        await PatientRequest.update(
            { accountStatus: AccountStatus.APPROVED },
            { where: { email } }
        );

        //now send notification email
    }

    public async rejectRegistration(email: string): Promise<any> {
        let req = await this.getRequest(email);

        if (!req) throw new Error("Email does not exist");

        if (
            req.accountStatus == AccountStatus.ACTIVATED ||
            req.accountStatus == AccountStatus.APPROVED
        )
            throw new Error("Account already activated");

        //change account status in requstes to rejected
        await PatientRequest.update(
            { accountStatus: AccountStatus.REJECTED },
            { where: { email } }
        );

        //now send notification email
    }

    public async activateRegistration(email: string): Promise<any> {
        let req = await this.getRequest(email);

        if (!req) throw new Error("Email does not exist");

        if (
            req.accountStatus == AccountStatus.ACTIVATED ||
            req.accountStatus == AccountStatus.APPROVED
        )
            throw new Error("Account already activated");

        
        // add requested patient to users
        let user = this.getUserFromRequest(req);
        await UsersService.createUser(user, UserRole.PATIENT);

        //change account status in requstes to activated
        await PatientRequest.update(
            { accountStatus: AccountStatus.ACTIVATED },
            { where: { email } }
        );

        //now send notification email
    }

    public async getRequest(email: string): Promise<any> {
        const regRequest: any = await PatientRequest.findOne({
            where: { email },
        });
        return regRequest;
    }

    public async getUserFromRequest(req : any): Promise<any> {

        let user = {
            email: req.email,
            password: req.password,
            firstName: req.firstName,
            lastName: req.lastName,
            jmbg: req.jmbg,
            city: req.city,
            country: req.country,
            address: req.address,
            phoneNumber: req.phoneNumber,
        };

        return user;
    }
}

export default new RegistrationReqService();
