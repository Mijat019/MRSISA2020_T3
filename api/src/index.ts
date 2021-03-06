import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import config from './config';
import db from './models/database';
import initModel from './models/initModel';
import initModelStega from './models/initModelStega';

import clinicsRoutes from './routes/clinicsRoutes';
import doctorsRoutes from './routes/doctorsRoutes';
import doctorSpecRoutes from './routes/doctorSpecRoutes';
import clinicAdminRoutes from './routes/clinicAdminRoutes';
import nurseRoutes from './routes/nursesRoutes';
import roomRoutes from './routes/roomsRoutes';
import authenticationRoutes from './routes/authenticationRoutes';
import profileRoutes from './routes/profileRoutes';
import patientsRoutes from './routes/patientsRoutes';
import freeAppointmentRoutes from './routes/freeAppointmentRoutes';
import confirmedAppointmentRoutes from './routes/confirmedAppointmentRoutes';
import appointmentTypeRoutes from './routes/appointmentTypeRoutes';
import drugsRoutes from './routes/drugsRoutes';
import diagnosisRoutes from './routes/diagnosisRoutes';
import clinicCenterAdminRoutes from './routes/clinicCenterAdminRoutes';
import priceListsRoutes from './routes/priceListsRoutes';
import appointmentRequestsRoutes from './routes/appointmentRequestsRoutes';
import appointmentReportRoutes from './routes/appointmentReportRoutes';
import patientMedicalRecordRoutes from './routes/patientMedicalRecordRoutes';
import ratingsRoutes from './routes/ratingsRoutes';
import leaveRequestsRoutes from './routes/leaveRequestsRoutes';
import operationRequestsRoutes from './routes/operationRequestsRoutes';
import operationsRoutes from './routes/operationsRoutes';
import operationAttendancesRoutes from './routes/operationAttendancesRoutes';
import patientsAtRoutes from './routes/patientsAtRoutes';
import reportRoutes from './routes/reportRoutes';

// connect to the database
(async () => {
  try {
    await db.authenticate();
    console.log('Connected to the database');
    // creates tables from model
    // drops tables if they already exist
    // uncomment next line if you want to apply changes to the schema
    await db.query('SET FOREIGN_KEY_CHECKS = 1');
    await db.sync({ force: true });
    await initModel();
    // await initModelStega();
  } catch (error) {
    console.log(error);
    console.log('An error occurred while trying to connect to the database');
  }
})();

const app: Application = express();

// middleware for express
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.use('/clinics', clinicsRoutes);
app.use('/doctors', doctorsRoutes);
app.use('/doctorSpec', doctorSpecRoutes);
app.use('/nurses', nurseRoutes);
app.use('/rooms', roomRoutes);
app.use('/auth', authenticationRoutes);
app.use('/profile', profileRoutes);
app.use('/patients', patientsRoutes);
app.use('/clinicAdmins', clinicAdminRoutes);
app.use('/freeAppointments', freeAppointmentRoutes);
app.use('/confirmedAppointments', confirmedAppointmentRoutes);
app.use('/appointmentTypes', appointmentTypeRoutes);
app.use('/priceLists', priceListsRoutes);
app.use('/drugs', drugsRoutes);
app.use('/diagnosis', diagnosisRoutes);
app.use('/clinicCenterAdmins', clinicCenterAdminRoutes);
app.use('/appointmentRequests', appointmentRequestsRoutes);
app.use('/appointmentReport', appointmentReportRoutes);
app.use('/patientMedicalRecord', patientMedicalRecordRoutes);
app.use('/leaveRequests', leaveRequestsRoutes);
app.use('/ratings', ratingsRoutes);
app.use('/operationRequests', operationRequestsRoutes);
app.use('/operations', operationsRoutes);
app.use('/operationAttendances', operationAttendancesRoutes);
app.use('/myPatients', patientsAtRoutes);
app.use('/report', reportRoutes);

app.use(express.static(__dirname + '/public/'));

app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
