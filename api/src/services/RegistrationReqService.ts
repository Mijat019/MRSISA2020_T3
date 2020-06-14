import UserRole from '../models/UserRole';
import RequestStatus from '../models/RequestStatus';
import UsersService from '../services/UsersService';
import config from '../config';
import bcrypt from 'bcrypt';
import PatientRequest from '../models/PatientRequest';
import Users from '../models/Users';
import AccountStatus from '../models/AccountStatus';
import EmailService from './EmailService';
import PatientMedicalRecord from '../models/PatientMedicalRecord';
import sequelize from './../models/database';
import moment from 'moment';
import { Op } from 'sequelize';

class RegistrationReqService {
  public async getAll() {
    const patientRequests = await PatientRequest.findAll({
      where: { requestStatus: RequestStatus.PENDING },
    });
    return patientRequests;
  }

  // Creates a request for registration
  public async register(userPayload: any): Promise<any> {
    // check if already registered
    const existsUser = await Users.findOne({
      where: {
        [Op.or]: [{ email: userPayload.email }, { jmbg: userPayload.jmbg }],
      },
    });
    if (existsUser) {
      if (existsUser.email === userPayload.email)
        throw new Error('Email already registered!');
      throw new Error('JMBG is not unique');
    }

    userPayload.requestStatus = RequestStatus.PENDING;
    userPayload.password = await bcrypt.hash(
      userPayload.password,
      config.saltRounds
    );
    await PatientRequest.create(userPayload);

    // send email
    let emailText = `Dear ${
      userPayload.firstName + ' ' + userPayload.lastName
    },\n\nYou have successfully submited a registration request at Covid Clinic!\nExpect an answer from us shortly.`;
    await EmailService.send({
      from: config.mail,
      to: userPayload.email,
      subject: 'Covid Clinic Registration',
      text: emailText,
    });
  }

  // after admin confirmation
  // adds patient from request to patients table
  public async approveRegistration(email: string): Promise<any> {
    try {
      return await sequelize.transaction(async (t) => {
        const regRequest = await PatientRequest.findOne({
          where: { email, requestStatus: RequestStatus.PENDING },
          transaction: t,
          lock: true,
        });

        if (!regRequest) throw new Error("Request doesn't exist anymore");

        await PatientRequest.update(
          {
            requestStatus: RequestStatus.APPROVED,
            approvedAt: new Date().getTime(),
          },
          { where: { email }, transaction: t }
        );

        //now send notification email
        EmailService.sendAccountConfirmationMail(regRequest, email);
      });
    } catch (error) {
      // notify user of error and rollback
      throw new Error(error);
    }
  }

  public async rejectRegistration(email: string, reason: string): Promise<any> {
    try {
      return await sequelize.transaction(async (t) => {
        const regRequest = await PatientRequest.findOne({
          where: { email, requestStatus: RequestStatus.PENDING },
          transaction: t,
          lock: true,
        });

        if (!regRequest) throw new Error("Request doesn't exist anymore");

        await PatientRequest.update(
          { requestStatus: RequestStatus.REJECTED },
          { where: { email }, transaction: t }
        );

        //now send notification email
        await EmailService.sendAccountRejectionMail(regRequest, email, reason);
      });
    } catch (error) {
      // notify user of error and rollback
      throw new Error(error);
    }
  }

  public async activateRegistration(email: string): Promise<any> {
    try {
      return await sequelize.transaction(async (t) => {
        const req = await PatientRequest.findOne({
          where: { email, requestStatus: RequestStatus.APPROVED },
          transaction: t,
          lock: true,
        });

        if (!req) throw new Error('Your account is not yet activated');

        const now = new Date().getTime();
        const oneDay = 8.64e7; //24 hours in milliseconds

        // 24h period has expired
        if (now - req.approvedAt > oneDay) {
          // delete request and throw an error
          await PatientRequest.destroy({ where: { email }, transaction: t });
          throw new Error(
            'Your link has expired!\n Submit your registration again'
          );
        }

        // add requested patient to users
        const user = this.getUserFromRequest(req);
        user.accountStatus = AccountStatus.ACTIVATED;
        // create a patient and his medical record
        const { id: userId } = await Users.create(user);
        await PatientMedicalRecord.create({ userId, transaction: t });

        // now we can delete request
        await PatientRequest.destroy({ where: { email }, transaction: t });

        //now send notification email
        await EmailService.sendAccountActivationMail(req, email);
      });
    } catch (error) {
      // notify user of error and rollback
      console.log('------------------');
      console.log(error);
      throw new Error(error);
    }
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
