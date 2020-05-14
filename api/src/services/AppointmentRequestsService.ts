import AppointmentRequests from "../models/AppointmentRequests";
import DoctorAt from '../models/DoctorAt'
import Users, { usersSelect } from '../models/Users'
import AppointmentTypes from '../models/AppointmentTypes'
import PriceLists from "../models/PriceLists";
import EmailService from './EmailService'
import config from "../config";


class AppointmentRequestsService {
    private include = [
        {
            model: DoctorAt,
            as: "doctor",
            include: [{ model: Users, as: "user", attributes: usersSelect }],
        },
        {
            model: PriceLists,
            as: "priceList",
            include: [{ model: AppointmentTypes, as: "appointmentType" }],
        },
        { model: Users, as: "patient" },
    ];

    public async getAll(): Promise<any> {
        const appointmentRequest = await AppointmentRequests.findAll({});
        return appointmentRequest;
    }

    public async getAllForClinic(clinicId : any): Promise<any> {
        const appointmentRequest = await AppointmentRequests.findAll({
            where : {clinicId : clinicId},
            include : this.include
        });
        return appointmentRequest;
    }

    public async confirm(requestPayload : any):Promise<any>  {
        console.log(requestPayload);
        
        // do something 

        // now send mail to notify
        let emailText = `Dear ${requestPayload.patient.firstName + " " + requestPayload.patient.lastName},
        \n\nYour Covid clinic appointment request has been approved!\n`;
        console.log(emailText);
        EmailService.send({
            from: config.mail,
            to: requestPayload.patient.email,
            subject: "Covid Clinic Appointment request",
            text: emailText,
        });
    }

    public async reject(requestPayload : any): Promise<any> {
        console.log(requestPayload);

        // do something 

        // now send mail to notify
        let emailText = `Dear ${requestPayload.patient + " " + requestPayload.patient.lastName},
        \n\nYour Covid clinic appointment request has been rejected because ${requestPayload.reason}!\n`;
        console.log(emailText);
        EmailService.send({
            from: config.mail,
            to: requestPayload.patient.email,
            subject: "Covid Clinic Appointment request",
            text: emailText,
        });
    }

    public async add(requestPayload: any): Promise<any> {
        const appointmentRequest = await AppointmentRequests.create(
            requestPayload
        );
        return appointmentRequest;
    }

    public async update(id: number, requestPayload: any): Promise<any> {
        await AppointmentRequests.update(requestPayload, {
            where: { id },
        });

        const updatedAppointmentRequest = await AppointmentRequests.findByPk(
            id
        );
        return updatedAppointmentRequest;
    }

    public async delete(id: any) {
        await AppointmentRequests.destroy({ where: { id: id } });
    }
}

export default new AppointmentRequestsService();
