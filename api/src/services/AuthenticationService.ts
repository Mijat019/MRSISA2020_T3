import config from "../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UsersService from "../services/UsersService";
import AccountStatus from "../models/AccountStatus";
import Users from "../models/Users";
import UserRole from "../models/UserRole";
import AdminAt from "../models/AdminAt";
import DoctorAt from "../models/DoctorAt";
import NurseAt from "../models/NurseAt";
import PatientMedicalRecord from "../models/PatientMedicalRecord";

class AuthenticationService {
  public async authenticateUser(email: string, password: string): Promise<any> {
    let user: any = await UsersService.getUser(email);
    if (!user) {
      throw new Error("No such user!");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Wrong email/password combination!");
    }

    if (user.status === AccountStatus.PENDING) {
      throw new Error("Your account is not activated. Check your email.");
    }

    return user;
  }

  public async generateToken(user: any): Promise<string> {
    let payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      jmbg: user.jmbg,
      phoneNumber: user.phoneNumber,
      city: user.city,
      country: user.country,
      address: user.address,
      role: user.role,
    };
    payload = await this.addDataToTokenPayload(payload);
    return await jwt.sign(payload, config.secret, { expiresIn: "2h" });
  }

  private async addDataToTokenPayload(payload: any) {
    switch (payload.role) {
      case UserRole.CLINIC_ADMIN:
        const adminAt = await AdminAt.findByPk(payload.id);
        payload.clinicId = adminAt?.clinicId;
        return payload;
      case UserRole.DOCTOR:
        const doctorAt = await DoctorAt.findByPk(payload.id);
        payload.clinicId = doctorAt?.clinicId;
        return payload;
      case UserRole.NURSE:
        const nurseAt = await NurseAt.findByPk(payload.id);
        payload.clinicId = nurseAt?.clinicId;
        return payload;
      case UserRole.PATIENT:
        const patientMedicalRecord: any = await PatientMedicalRecord.findByPk(
          payload.id
        );
        const { height, weight, bloodType } = patientMedicalRecord;
        payload.medicalRecord = { height, weight, bloodType };
        return payload;
      default:
        return payload;
    }
  }

  public async setPassword(id: string, password: string) {
    let user: any = await Users.findByPk(id);
    if (user.status === AccountStatus.PENDING) {
      throw new Error("The password has already been set.");
    }
    const hashedPassword = await bcrypt.hash(password, config.saltRounds);
    await user.update({
      password: hashedPassword,
      status: AccountStatus.ACTIVATED,
    });
  }

  
}

export default new AuthenticationService();
