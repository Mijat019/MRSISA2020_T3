import moment from 'moment';
import UsersService from '../services/UsersService';
import UserRole from './UserRole';
import ClinicsService from '../services/ClinicsService';
import ClinicAdminService from '../services/ClinicAdminService';
import DoctorsService from '../services/DoctorsService';
import Drugs from './Drugs';
import Diagnosis from './Diagnosis';
import PriceLists from './PriceLists';
import AppointmentTypes from './AppointmentTypes';
import Rooms from './Rooms';
import ConfirmedAppointments from './ConfirmedAppointments';
import Users from './Users';
import PatientsService from '../services/PatientsService';
import PatientMedicalRecord from './PatientMedicalRecord';
import AccountStatus from './AccountStatus';
import FreeAppointments from './FreeAppointments';
import DoctorRating from './DoctorRating';
import ClinicRating from './ClinicRating';
import NursesService from '../services/NursesService';
import ConfirmedAppointmentService from '../services/ConfirmedAppointmentService';
import LeaveRequestsService from '../services/LeaveRequestsService';

export default async () => {

  const { id } = await ClinicsService.add({
    name: 'Druga Klinika',
    city: 'Novi Sad',
    address: 'Mise Dimitrijevica',
    country: 'Srbija',
    description: 'Nije nam losa klinika',
  });

  const password = "$2b$05$pkbjSCsHotPLcnduIUB5huFXsXPutSq3oBzWoiUG5wIVrcg/lAgp.";

  const { id: roomId } = await Rooms.create({
    clinicId: id,
    name: 'Soba 2.1',
  });

  const { id: appointmentTypeId } = await AppointmentTypes.create({
    name: 'Sistematski pregled',
  });

  const { id: priceListId } = await PriceLists.create({
    clinicId: id,
    appointmentTypeId,
    price: 1420,
  });


  const { userId: nurseId } = await NursesService.add(
    {
      firstName: 'Sestra',
      lastName: 'Sestric',
      email: '22222s',
      jmbg: '2504686',
      phoneNumber: '666',
      country: 'Serbia',
      city: 'Zajecar',
      address: 'Vojvode stepe 20',
      accountStatus: 1,
    },
    id
  );

  await Users.update(
    { password, accountStatus: AccountStatus.ACTIVATED },
    { where: { id: nurseId } }
  );

  const { userId: doctorId } = await DoctorsService.add(
    {
      firstName: 'Milovan',
      lastName: 'Deretic',
      email: 'd2.2.2',
      jmbg: '55943318',
      phoneNumber: '444',
      country: 'Serbia',
      city: 'Novi Sad',
      address: 'Vojvode stepe 20',
      accountStatus: 1,
    },
    id
  );

  await Users.update(
    { password, accountStatus: AccountStatus.ACTIVATED },
    { where: { id: doctorId } }
  );

  await DoctorsService.addSpecialization(doctorId, appointmentTypeId);

  const june = moment("2020-06-25 12:00","YYYY-MM-DD");    

  const { id: userId }: any = await UsersService.createUser(
    {
      firstName: 'K2 Nikola',
      lastName: 'Nikolic',
      email: '2p1',
      password: '1',
      jmbg: '22568646842',
      phoneNumber: '41',
      country: 'Serbia',
      city: 'Novi Sad',
      address: 'Cara Lazara 33',
      accountStatus: 1,
    },
    UserRole.PATIENT
  );

  const { userId: patient1Id } = await PatientMedicalRecord.create({ userId });


  await ConfirmedAppointmentService.add({
    priceListId,
    doctorId,
    patientId: patient1Id,
    roomId,
    start: june.unix(),
    duration: 60,
  });

  await FreeAppointments.create({
    priceListId,
    doctorId,
    roomId,
    duration: 60,
    start: june.add(2, 'hour').unix(),
  });

  const { userId: tutu } = await ClinicAdminService.add(
    {
      firstName: 'Druge Klinike',
      lastName: 'Admin',
      email: '2ak1',
      password,
      jmbg: '12312332312',
      phoneNumber: '4344211',
      country: 'Serbia',
      city: 'Novi Sad',
      address: 'Cara Dusana 20',
      accountStatus: 1,
    },
    id
  );

  await Users.update(
    { password, accountStatus: AccountStatus.ACTIVATED },
    { where: { id: tutu } }
  );


  await ClinicRating.create({
    patientId: userId,
    clinicId: id,
    serviceRating: 4,
    cleanlinessRating: 3,
    timeRating: 2,
    averageRating: 3,
    comment: 'OKAY',
  });


  await DoctorRating.create({
    patientId: userId,
    doctorId: doctorId,
    communicationRating: 5,
    expertiseRating: 5,
    timeRating: 5,
    averageRating: 5,
    comment: 'GREAT',
  });

};
