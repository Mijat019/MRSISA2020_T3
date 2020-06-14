import nodemailer from 'nodemailer';
import config from '../config';
import moment from 'moment';
import Users from '../models/Users';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'covid19.clinic.llc@gmail.com',
    pass: 'M33y4tsuX!',
  },
});

class EmailService {
  public async sendMailAboutOperation(operation: any) {
    const time = moment.unix(operation.start).format('lll');
    let text = `Dear ${operation.doctor.user.firstName} ${operation.doctor.user.lastName} you have an operation at ${time} for patient ${operation.patient.user.firstName} ${operation.patient.user.lastName} in room in room ${operation.room.name}`;

    await this.send({
      from: config.mail,
      to: operation.doctor.user.email,
      subject: 'operacija',
      text,
    });

    for (let e of operation.operationAttendances) {
      let text = `Dear ${e.user.firstName} ${e.user.lastName} you need to attend an operation at ${time} in room ${operation.room.name}`;
      await this.send({
        from: config.mail,
        to: e.user.email,
        subject: 'operacija',
        text,
      });
    }

    text = `Dear ${operation.patient.user.firstName} ${operation.patient.user.lastName} you have an operation at ${time} in room ${operation.room.name}`;
    await this.send({
      from: config.mail,
      to: operation.patient.user.email,
      subject: 'operacija',
      text,
    });
  }

  public async sendAppointmentCancellationEmail(appointment: any) {
    let text = `Dear ${appointment.patient.user.firstName} ${
      appointment.patient.user.firstName
    } your appointment at ${moment(appointment.start).format(
      'lll'
    )} was canceled.`;
    const subject = 'Appointment cancellation';

    await this.send({
      to: appointment.patient.user.email,
      from: config.mail,
      text,
      subject,
    });

    text = `Dear ${appointment.doctor.user.firstName} ${
      appointment.doctor.user.firstName
    } your appointment at ${moment(appointment.start).format(
      'lll'
    )} was canceled.`;
    await this.send({
      to: appointment.doctor.user.email,
      from: config.mail,
      text,
      subject,
    });
  }

  public async sendAppointmentRequestAcceptedMail(appointment: any) {
    const patient = appointment.patientMedicalRecord.user;
    const doctor = appointment.doctor.user;
    // first send to patient
    let text = `Dear ${patient.firstName + ' ' + patient.lastName},
    your appointment request has been approved.\n
    Appointment type: ${appointment.priceList.appointmentType.name}
    Doctor: ${doctor.firstName + ' ' + doctor.lastName}
    Date: ${moment.unix(appointment.start).format('YYYY-MM-DD HH:mm')}`;
    let subject = 'Appointment request';
    await this.send({
      to: patient.email,
      from: config.mail,
      text,
      subject,
    });
    console.log(text);

    // Send email to doctor
    text = `Dear Dr. ${doctor.firstName + ' ' + doctor.lastName},
    you have a new confirmed appointment.\n
    Appointment type: ${appointment.priceList.appointmentType.name}
    Patient: ${patient.firstName + ' ' + patient.lastName}
    Date: ${moment.unix(appointment.start).format('YYYY-MM-DD HH:mm')}`;
    subject = 'New confirmed appointment';
    await this.send({
      to: doctor.email,
      from: config.mail,
      text,
      subject,
    });
    console.log(text);
  }

  public async sendAccountConfirmationMail(req: any, email: string) {
    let emailText = `Dear ${
      req.firstName + ' ' + req.lastName
    },\nYour Covid clinic account has been approved!\nYou have 24h to activate it: https://covid19-clinic.herokuapp.com/patients/activate/${email}`;
    await this.send({
      from: config.mail,
      to: email,
      subject: 'Covid Clinic Registration',
      text: emailText,
    });
    console.log(emailText);
  }

  public async sendAccountRejectionMail(req: any, email: string, reason: any) {
    //now send notification email
    let emailText = `Dear ${
      req.firstName + ' ' + req.lastName
    },\nYour request to register to covid clinic has been rejected.\nReason: ${reason}.`;
    await this.send({
      from: config.mail,
      to: email,
      subject: 'Covid Clinic Registration',
      text: emailText,
    });
    console.log(emailText);
  }

  public async sendAccountActivationMail(req: any, email: string) {
    let emailText = `Dear ${
      req.firstName + ' ' + req.lastName
    },\nYour Covid clinic account has been activated!`;
    await this.send({
      from: config.mail,
      to: email,
      subject: 'Covid Clinic Registration',
      text: emailText,
    });
    console.log(emailText);
  }

  public async automaticResponseAccept(req: any) {
    const user = await Users.findOne({ where: { id: req.patientId } });
    let text = `Dear ${user?.firstName + ' ' + user?.lastName},
    your appointment request has been approved.\n
    Date: ${moment.unix(req.start).format('YYYY-MM-DD HH:mm')}`;
    let subject = 'Appointment request';
    await this.send({
      to: user?.email,
      from: config.mail,
      text,
      subject,
    });
    console.log(text);
  }

  public async sendFreeAppoAccept(appo: any, patientId: any) {
    const user = await Users.findOne({ where: { id: patientId } });
    let text = `Dear ${user?.firstName + ' ' + user?.lastName},
    you have successfully reserved free appointment.
    Date: ${moment.unix(appo.start).format('YYYY-MM-DD HH:mm')}`;
    let subject = 'Appointment request';
    await this.send({
      to: user?.email,
      from: config.mail,
      text,
      subject,
    });
    console.log(text);
  }

  // mailOption is an object
  // with from, to, subject and text fields
  public async send(mailOptions: any): Promise<any> {
    try {
      await transporter.sendMail(mailOptions);
    } catch (e) {
      console.log('Error occured while sending email!');
    }
  }
}

export default new EmailService();
