import UserRole from "../models/UserRole";
import RequestStatus from "../models/RequestStatus";
import UsersService from "../services/UsersService";
import config from "../config";
import bcrypt from "bcrypt";
import PatientRequest from "../models/PatientRequest";
import Users from "../models/Users";
import AccountStatus from "../models/AccountStatus";
import EmailService from "./EmailService";
import PatientMedicalRecord from "../models/PatientMedicalRecord";

class RegistrationReqService {
  public async getAll() {
    const patientRequests = await PatientRequest.findAll({
      where: { requestStatus: RequestStatus.PENDING },
    });
    return patientRequests;
  }

  // Creates a request for registration
  public async register(userPayload: any): Promise<any> {
    userPayload.requestStatus = RequestStatus.PENDING;
    userPayload.password = await bcrypt.hash(
      userPayload.password,
      config.saltRounds
    );
    await PatientRequest.create(userPayload);

    // send email
    let emailText = `Dear ${
      userPayload.firstName + " " + userPayload.lastName
    },\n\nYou have successfully submited a registration request at Covid Clinic!\nExpect an answer from us shortly.`;
    await EmailService.send({
      from: config.mail,
      to: userPayload.email,
      subject: "Covid Clinic Registration",
      text: emailText,
    });
  }

  // after admin confirmation
  // adds patient from request to patients table
  public async approveRegistration(email: string): Promise<any> {
    let req = await this.getRequest(email);

    if (!req) throw new Error("Email does not exist");

    if (req.requestStatus == RequestStatus.APPROVED)
      throw new Error("Request already approved!");

    //change account status in requstes to approved
    await PatientRequest.update(
      {
        requestStatus: RequestStatus.APPROVED,
        approvedAt: new Date().getTime(),
      },
      { where: { email } }
    );

    //now send notification email
    let emailText = `Dear ${
      req.firstName + " " + req.lastName
    },\n\nYour Covid clinic account has been approved!\nYou have 24h to activate it: http://localhost:4200/patients/activate/${email}`;
    console.log(emailText);
    EmailService.send({
      from: config.mail,
      to: email,
      subject: "Covid Clinic Registration",
      text: emailText,
    });
  }

  public async rejectRegistration(email: string, reason: string): Promise<any> {
    let req = await this.getRequest(email);

    if (!req) throw new Error("Email does not exist!");

    //change account status in requstes to rejected
    await PatientRequest.update(
      { requestStatus: RequestStatus.REJECTED },
      { where: { email } }
    );

    //now send notification email
    let emailText = `Dear ${
      req.firstName + " " + req.lastName
    },\n\nYour request to register to covid clinic has been rejected.\nReason: ${reason}.`;
    EmailService.send({
      from: config.mail,
      to: email,
      subject: "Covid Clinic Registration",
      text: emailText,
    });
  }

  public async activateRegistration(email: string): Promise<any> {
    let req = await this.getRequest(email);

    if (req.requestStatus != RequestStatus.APPROVED)
      throw new Error("Request must first be approved!");

    let now = new Date().getTime();
    let oneDay = 8.64e7; //24 hours in milliseconds

    // 24h period has expired
    if (now - req.approvedAt > oneDay) {
      // delete request and throw an error
      await PatientRequest.destroy({ where: { email } });
      throw new Error(
        "Your link has expired!\n Submit your registration again"
      );
    }

    // add requested patient to users
    let user = this.getUserFromRequest(req);
    user.accountStatus = AccountStatus.ACTIVATED;
    // create a patient and his medical record
    const { id: userId } = await Users.create(user);
    await PatientMedicalRecord.create({ userId });

    // now we can delete request
    await PatientRequest.destroy({ where: { email } });

    //now send notification email
    let emailText = `Dear ${
      req.firstName + " " + req.lastName
    },\n\nYour Covid clinic account has been activated!`;
    EmailService.send({
      from: config.mail,
      to: email,
      subject: "Covid Clinic Registration",
      text: emailText,
    });
  }

  public async getRequest(email: string): Promise<any> {
    const regRequest: any = await PatientRequest.findOne({
      where: { email },
    });
    return regRequest;
  }

  public getUserFromRequest(req: any): any {
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
      role: UserRole.PATIENT,
    };

    return user;
  }
}

export default new RegistrationReqService();
