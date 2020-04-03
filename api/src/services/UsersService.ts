import config from "../config";
import bcrypt from "bcrypt";
import Users from "../models/Users";
import UserRole from "../models/UserRole";

class UsersService {
  public async registerPatient(user: any): Promise<any> {
    user.password = await bcrypt.hash(user.password, config.saltRounds);
    user.role = UserRole.PATIENT;
    // delete user.confirmed_password;
    await Users.create(user);
  }

  public async getUser(email: string): Promise<Users> {
    const user: any = await Users.findOne({ where: { email } });
    return user;
  }

  //   /** Returns user and role or throws an error if user doesn't exist */
  //   public async getUser(email: string): Promise<User> {
  //     // first search all patients
  //     let user: any = await Patients.findOne({ where: { email: email } });

  //     if (user === null) user = null;
  //     // user = Doctors.findOne({where : {email : email}});
  //     else user.role = "patient";

  //     // user not doctor or patient so check nurses
  //     if (user === null) user = null;
  //     // user = Nurses.findOne({where : {email : email}});
  //     else if (user.role !== "patient") user.role = "doctor";

  //     // if null again this means user doesn't exist
  //     if (user === null) return user;
  //     else if (user.role !== "patient" && user.role !== "doctor")
  //       user.role = "nurse";

  //     return user;
  //   }
}

export default new UsersService();
