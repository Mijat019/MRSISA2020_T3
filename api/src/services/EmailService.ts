import nodemailer from 'nodemailer';
import config from '../config';
import moment from 'moment';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mail,
    pass: config.password,
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

  // mailOption is an object
  // with from, to, subject and text fields
  public async send(mailOptions: any): Promise<any> {
    try {
      await transporter.sendMail(mailOptions);
    } catch (e) {
      console.log('email error');
    }
  }
}

export default new EmailService();
