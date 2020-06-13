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
    text = `Dear Dr. ${doctor.firstName + ' ' +  doctor.lastName},\n
    you have a new confirmed appointment.\n
    Appointment type: ${appointment.priceList.appointmentType.name}\n
    Patient: ${patient.firstName  + ' ' + patient.lastName}
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
