import config from "../config";
import bcrypt from "bcrypt";
import Users from "../models/Users";
import UserRole from "../models/UserRole";
import EmailService from "./EmailService";

class UsersService {
  public async createUser(userPayload: any, role: UserRole) {
    userPayload.password = await bcrypt.hash(
      userPayload.password,
      config.saltRounds
    );
    userPayload.role = role;
    const user = await Users.create(userPayload);
    return user;
  }

  public async getUser(email: string): Promise<Users> {
    const user: any = await Users.findOne({ where: { email } });
    return user;
  }

  public async sendEmailWithLinkToSetPassword(user: any) {
    console.log(user);
    const link = `http://localhost:8080/setPassword/${user.id}`;
    const emailText = `Dear ${user.firstName} ${user.lastName} \n You have been registered to Covid19Clinic, to login you need to set a password. You can do that by clicking on this link ${link}`;
    EmailService.send({
      from: config.mail,
      to: user.email,
      subject: "Covid Clinic Registration",
      text: emailText,
    });

    // console log this so you can click on it whit out checking you email
    console.log(link);
  }
}

export default new UsersService();
