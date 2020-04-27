import config from "../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UsersService from "../services/UsersService";
import AccountStatus from "../models/AccountStatus";
import Users from "../models/Users";

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
    const payload = {
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

    return await jwt.sign(payload, config.secret, { expiresIn: "2h" });
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
