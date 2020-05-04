import config from "../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UsersService from "../services/UsersService";
import AccountStatus from "../models/AccountStatus";
import Users from "../models/Users";
import UserRole from "../models/UserRole";
import AdminOf from "../models/AdminOf";
import DoctorAt from "../models/DoctorAt";
import NurseAt from "../models/NurseAt";

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
    payload = await this.addClinicIdToTokenPayload(payload);
    return await jwt.sign(payload, config.secret, { expiresIn: "2h" });
  }

  private async addClinicIdToTokenPayload(payload: any) {
    switch (payload.role) {
      case UserRole.CLINIC_ADMIN:
        const adminOf = await AdminOf.findByPk(payload.id);
        payload.clinicId = adminOf?.ClinicId;
        return payload;
      case UserRole.DOCTOR:
        const doctorAt = await DoctorAt.findByPk(payload.id);
        payload.clinicId = doctorAt?.clinicId;
        return payload;
      case UserRole.NURSE:
        const nurseAt = await NurseAt.findByPk(payload.id);
        payload.clinicId = nurseAt?.ClinicId;
        return payload;
      default:
        return payload;
    }
  }

  public async setPassword(id: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, config.saltRounds);
    let user: any = await Users.findByPk(id);
    if (user.status === AccountStatus.PENDING) {
      throw new Error("The password has already been set.");
    }
    await user.update({
      password: hashedPassword,
      status: AccountStatus.ACTIVATED,
    });
  }
}

export default new AuthenticationService();
