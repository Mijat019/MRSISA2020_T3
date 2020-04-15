import config from "../config";
import bcrypt from "bcrypt";
import Users from "../models/Users";
import UserRole from "../models/UserRole";

class UsersService {

  public async createUser(userPayload: any, role: UserRole) {
    userPayload.role = role;
    userPayload.password = await bcrypt.hash(
      userPayload.password,
      config.saltRounds
    );
    const user = await Users.create(userPayload);
    return user;
  }

  public async getUser(email: string): Promise<Users> {
    const user: any = await Users.findOne({ where: { email } });
    return user;
  }
}

export default new UsersService();
