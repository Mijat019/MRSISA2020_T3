import config from '../config';
import Patients from '../models/Users/Patients'
import Doctors from '../models/Users/Doctors'
import Nurses from '../models/Users/Nurses'
import { User } from '../models/Users/User';

var bcrypt = require('bcrypt')
const rounds = 5;

class UsersService {

    public async registerPatient( user : any ) : Promise<any> {
        const user_exist = await this.getUser(user.email);
        if (user_exist !== null) {
            throw new Error("Email already exists!");
        }
        
        //add user to database
        user.password = await bcrypt.hash(user.password, rounds);
        delete user.confirmed_password;
        await Patients.create(user);
    }

    /** Returns user and role or throws an error if user doesn't exist */
    public getUser(email : string) :Promise<User>{
        
        // first search all patients
        let user: any  = Patients.findOne({where : {email : email}});
        
        if (user === null) 
            user = Doctors.findOne({where : {email : email}});
        else
            user.role = "patient"
        
        // user not doctor or patient so check nurses
        if (user === null) 
            user = Nurses.findOne({where : {email : email}});
        else if (user.role !== "patient")
            user.role = "doctor";
        
        // if null again this means user doesn't exist
        if (user === null)
            return user;
        else if (user.role !== "patient" && user.role !== "doctor")
            user.role = "nurse";
        
        return user;
    }
}


export default new UsersService();