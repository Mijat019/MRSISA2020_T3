import nodemailer from 'nodemailer';
import config from '../config';
import moment from 'moment';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "covid19.clinic.llc@gmail.com",
    pass: "M33y4tsuX!",
  },
});

class EmailService {
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
    let text = `Dear ${patient.firstName + ' ' + patient.lastName},\n
    your appointment request has been approved.\n
    Appointment type: ${appointment.priceList.appointmentType.name}\n
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
    text = `Dear Dr. ${doctor.firstName + ' ' + doctor.lastName},\n
    you have a new confirmed appointment.\n
    Appointment type: ${appointment.priceList.appointmentType.name}\n
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
    },\n\nYour Covid clinic account has been approved!\nYou have 24h to activate it: http://localhost:4200/patients/activate/${email}`;
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
    },\n\nYour request to register to covid clinic has been rejected.\nReason: ${reason}.`;
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
    },\n\nYour Covid clinic account has been activated!`;
    await this.send({
      from: config.mail,
      to: email,
      subject: 'Covid Clinic Registration',
      text: emailText,
    });
    console.log(emailText);
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
