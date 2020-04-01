import config from '../config';
import Patients from '../models/Users/Patients'
import Doctors from '../models/Users/Doctors'
import Nurses from '../models/Users/Nurses'
import { User } from '../models/Users/User';
import UsersService from '../services/UsersService'

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
const rounds = 5;

class AuthenticationService {

    public async authenenticateUser(email : string, password : string): Promise<any> {

        let user :any = await UsersService.getUser(email);
        console.log(user.role);               // ne kontam zasto je ovde undefined
        console.log("ROOOOOLE");        
        if (user === null) {
            throw new Error("No such user!");
        }

        if(!await this.checkPassword(user, password)) 
            throw new Error("Wrong email/password combination!");

        return user;
    }

    private async checkPassword(user : any, password : string) {
        return await bcrypt.compare(password, user.password);
    }

    public async generateToken(user : any): Promise<string> {
        
        const payload = {
            id : user.id,
            email : user.email,
            firstName : user.firstName,
            lastName : user.lastName, 
            jmbg : user.jmbg,
            phoneNumer : user.phoneNumer,
            city : user.city,
            country : user.country,
            address : user.address,
            role : user.role
        }

        return await jwt.sign(payload, config.secret, {expiresIn: "2h"});
    }
}


export default new AuthenticationService();