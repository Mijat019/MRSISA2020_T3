import config from '../config';
// import User from '../models/Users/User'
import Patients from '../models/Users/Patients'
import Doctors from '../models/Users/Doctors'
import Nurses from '../models/Users/Nurses'
import { User } from '../models/Users/User';

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
const rounds = 5;

class AuthenticationService {

    public async authenenticateUser(email : string, password : string): Promise<any> {

        const user = await this.getUser(email);
        if (user === null) {
            throw new Error("No such user!");
        }
        if(this.checkPassword(user, password)) 
            throw new Error("Wrong email/password combination!");
        // this.checkPassword(user, password);
        return user;
    }

    public async registerUser( user : any ) : Promise<any> {
        const user_exist = await this.getUser(user.email);
        console.log(user_exist);
        if (user_exist !== null) {
            throw new Error("Email already exists!");
        }
        
        //add user to database
        user.password = await bcrypt.hash(user.password, rounds);
        delete user.confirmed_password;
        console.log(user);
        await Patients.create(user);
    }

    private async checkPassword(user : any, password : string) {
        console.log(user.password);
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
            address : user.address
        }

        return await jwt.sign(payload, config.secret);
    }

    /** Returns user and role or throws an error if user doesn't exist */
    public getUser(email : string) :Promise<User>{
        let user: any  = Patients.findOne({where : {email : email}});

        // if (user === null) 
        //     user = Doctors.findOne({where : {email : email}});
        // else
        //     user.role = "patient"
        
        // if (user === null) 
        //     user = Nurses.findOne({where : {email : email}});
        // else
        //     user.role = "doctor";
        
        // if (user === null)
        //     return user;
        
        // user.role = "nurse"
        return user;
    }

}


export default new AuthenticationService();