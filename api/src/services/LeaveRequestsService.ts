import config from "../config";
import bcrypt from "bcrypt";
import LeaveRequests from '../models/LeaveRequests';
import DoctorAt from "../models/DoctorAt";
import Users from "../models/Users";

class LeaveRequestsService {
  public async add(userId: number, dates: any): Promise<any> {
    // Get clinic id
    let { clinicId }: any = await DoctorAt.findOne({ where: { userId } });

    // Create new request
    const leaveReq = await LeaveRequests.create({
      userId,
      clinicId,
      from: dates.from,
      to: dates.to,
      status: "Pending"
    });

    return leaveReq;
  }

  public async getForUser(userId: number): Promise<any> {
    return await LeaveRequests.findAll({ 
      where: { userId }
    });
  }

  public async getForClinic(clinicId: number): Promise<any> {
    return await LeaveRequests.findAll({
      where: { clinicId },
      include: [
        { model: Users, attributes: ["id", "firstName", "lastName"], as: "employee" }
      ]
    });
  }

  public async approve(id: number): Promise<any> {
    let leaveReq = await LeaveRequests.findByPk(id);
    if (leaveReq!.status !== "Pending") {
      throw new Error("This leave request was already " + leaveReq!.status);
    }
    leaveReq!.status = "Approved";
    leaveReq?.save();
  }

  public async deny(id: number, reason: string): Promise<any> {
    let leaveReq = await LeaveRequests.findByPk(id);
    if (leaveReq!.status !== "Pending") {
      throw new Error("This leave request was already " + leaveReq!.status);
    }
    leaveReq!.status = "Denied";
    leaveReq!.reason = reason;
    leaveReq?.save();
  }
}

export default new LeaveRequestsService();
