import config from "../config";
import bcrypt from "bcrypt";
import Users from "../models/Users";
import UserRole from "../models/UserRole";
import EmailService from "./EmailService";
import AccountStatus from "../models/AccountStatus";
import DoctorAt from "../models/DoctorAt";
import NurseAt from "../models/NurseAt";

class UsersService {
  /**
   * Creates a user with a provided role. Use this method when
   * you are creating a user with a password (Patients). Otherwise
   * @see createEmployee
   * @param userPayload
   * @param role
   */
  public async createUser(userPayload: any, role: UserRole) {
    userPayload.password = await bcrypt.hash(
      userPayload.password,
      config.saltRounds
    );
    userPayload.role = role;
    const user = await Users.create(userPayload);
    return user;
  }

  /**
   * Creates a user without a password and with status PENDING.
   * A password for an employee is provided later when he sets it.
   * @param userPayload
   */
  public async createEmployee(userPayload: any, role: UserRole) {
    // Create the user
    userPayload.status = AccountStatus.PENDING;
    userPayload.role = role;
    userPayload.password = "";
    const user = await Users.create(userPayload);
    return user;
  }

  public async getUser(email: string): Promise<Users> {
    const user: any = await Users.findOne({ where: { email } });
    return user;
  }

  public async sendEmailWithLinkToSetPassword(user: any) {
    const link = `http://localhost:8080/setPassword/${user.id}`;
    const emailText = `Dear ${user.firstName} ${user.lastName} \n You have been registered to Covid19Clinic, to login you need to set a password. You can do that by clicking on this link ${link}`;
    EmailService.send({
      from: config.mail,
      to: user.email,
      subject: "Covid Clinic Registration",
      text: emailText,
    });

    // log this so you can click on it without checking your email
    console.log(link);
  }
}

export default new UsersService();
