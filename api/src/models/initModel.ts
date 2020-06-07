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

export default async () => {
  await DoctorRating.findAll({});
  await ClinicRating.findAll({});

  await Diagnosis.create({ name: 'Insane in the membrane' });
  await Diagnosis.create({ name: 'Vucic' });

  await Drugs.create({ name: 'Percocet' });
  await Drugs.create({ name: 'Molly' });
  await Drugs.create({ name: 'Percocets' });

  const { password } = await UsersService.createUser(
    {
      firstName: 'Admin',
      lastName: 'Klinickog Centra',
      email: 'akc1',
      password: '1',
      jmbg: '1232132312121231231233312312',
      phoneNumber: '4',
      country: 'Serbia',
      city: 'Zajecar',
      address: 'Vojvode stepe 20',
      accountStatus: 1,
    },
    UserRole.CLINIC_CENTER_ADMIN
  );

  const { id } = await ClinicsService.add({
    name: 'SNS klinika',
    city: 'Beograd',
    address: 'Neka tamo ulica',
    country: 'Srbija',
    description: 'Izvadimo vam mozak i damo vam 100 jura',
  });

  const { id: roomId } = await Rooms.create({
    clinicId: id,
    name: 'Soba 1',
  });
  const { id: roomId2 } = await Rooms.create({
    clinicId: id,
    name: 'Soba 2',
  });
  const { id: roomId3 } = await Rooms.create({
    clinicId: id,
    name: 'Soba 3',
  });

  const { id: appointmentTypeId } = await AppointmentTypes.create({
    name: 'Ocni pregled',
  });
  const { id: appointmentTypeId2 } = await AppointmentTypes.create({
    name: 'Nozni pregled',
  });
  const { id: appointmentTypeId3 } = await AppointmentTypes.create({
    name: 'Rucni pregled',
  });

  const { id: priceListId } = await PriceLists.create({
    clinicId: id,
    appointmentTypeId,
    price: 420,
  });


  const { id: priceListId2 } = await PriceLists.create({
    clinicId: id,
    appointmentTypeId: appointmentTypeId2,
    price: 300,
  });

  const { id: priceListId3 } = await PriceLists.create({
    clinicId: id,
    appointmentTypeId: appointmentTypeId3,
    price: 1000,
  });

  const { userId: nurseId } = await NursesService.add(
    {
      firstName: 'Sestra',
      lastName: 'Sestric',
      email: '2',
      jmbg: '666',
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
      firstName: 'Doktor',
      lastName: 'Doktoric',
      email: 'd1',
      jmbg: '1232312312',
      phoneNumber: '444',
      country: 'Serbia',
      city: 'Zajecar',
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

  const { userId: doctorId2 } = await DoctorsService.add(
    {
      firstName: 'Doktor2',
      lastName: 'Doktoric2',
      email: 'd2',
      jmbg: '66343534',
      phoneNumber: '444',
      country: 'Serbia',
      city: 'Zajecar',
      address: 'Vojvode stepe 20',
      accountStatus: 1,
    },
    id
  );

  await Users.update(
    { password, accountStatus: AccountStatus.ACTIVATED },
    { where: { id: doctorId2 } }
  );

  const { id: userId }: any = await UsersService.createUser(
    {
      firstName: 'Pacijent',
      lastName: 'Pacijentic_1',
      email: 'p1',
      password: '1',
      jmbg: '123213231212123331231233312312',
      phoneNumber: '41',
      country: 'Serbia',
      city: 'Zajecar',
      address: 'Vojvode stepe 20',
      accountStatus: 1,
    },
    UserRole.PATIENT
  );

  const { userId: patientId } = await PatientMedicalRecord.create({ userId });


  const { id: userId2 }: any = await UsersService.createUser(
    {
      firstName: 'Pacijent',
      lastName: 'Pacijentic_2',
      email: 'p2',
      password: '1',
      jmbg: '1222',
      phoneNumber: '41',
      country: 'Serbia',
      city: 'Zajecar',
      address: 'Vojvode stepe 20',
      accountStatus: 1,
    },
    UserRole.PATIENT
  );

  await PatientMedicalRecord.create({ userId: userId2 });


  await ConfirmedAppointments.create({
    priceListId,
    doctorId,
    patientId,
    roomId,
    start: moment().unix(),
    duration: 60,
  });

  await ConfirmedAppointments.create({
    priceListId,
    doctorId,
    patientId,
    roomId,
    start: moment().add(1, 'hour').unix(),
    duration: 60,
  });

  await FreeAppointments.create({
    priceListId,
    doctorId,
    roomId,
    duration: 60,
    start: moment().add(2, 'hour').unix(),
  });

  const { userId: tutu } = await ClinicAdminService.add(
    {
      firstName: 'Admin',
      lastName: 'Klinike',
      email: 'ak1',
      password,
      jmbg: '123213231133333322312312',
      phoneNumber: '4311',
      country: 'Serbia',
      city: 'Zajecar',
      address: 'Vojvode stepe 20',
      accountStatus: 1,
    },
    id
  );

  await Users.update(
    { password, accountStatus: AccountStatus.ACTIVATED },
    { where: { id: tutu } }
  );


  const { userId: id2 } = await ClinicAdminService.add(
    {
      firstName: 'Drugi',
      lastName: 'Admin Klinike',
      email: 'ak2',
      password,
      jmbg: '123312',
      phoneNumber: '4311',
      country: 'Serbia',
      city: 'Zajecar',
      address: 'Vojvode stepe 20',
      accountStatus: 1,
    },
    id
  );

  await Users.update(
    { password, accountStatus: AccountStatus.ACTIVATED },
    { where: { id: id2 } }
  );
};
