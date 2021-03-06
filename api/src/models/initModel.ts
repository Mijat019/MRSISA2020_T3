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
import OperationRequests from './OperationRequests';
import Operations from './Operations';
import OperationAttendances from './OperationAttendances';
import ConfirmedAppointmentService from '../services/ConfirmedAppointmentService';
import LeaveRequestsService from '../services/LeaveRequestsService';
import initModelK2 from './initModelK2';
import AppointmentReports from './AppointmentReports';
import LeaveRequests from './LeaveRequests';

export default async () => {
    const { id: diagnosisId } = await Diagnosis.create({
        name: 'Insane in the membrane',
    });
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
    await DoctorsService.addSpecialization(doctorId, appointmentTypeId2);
    await DoctorsService.addSpecialization(doctorId, appointmentTypeId3);

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

    await DoctorsService.addSpecialization(doctorId2, appointmentTypeId);
    await DoctorsService.addSpecialization(doctorId2, appointmentTypeId3);

    await Users.update(
        { password, accountStatus: AccountStatus.ACTIVATED },
        { where: { id: doctorId2 } }
    );

    const { userId: doctorId321 } = await DoctorsService.add(
        {
            firstName: 'Dobrivoje',
            lastName: 'Dobric',
            email: 'd3',
            jmbg: '3318424',
            phoneNumber: '444 523',
            country: 'Serbia',
            city: 'Novi Sad',
            address: 'Cara Lazara 212',
            accountStatus: 1,
        },
        id
    );

    await Users.update(
        { password, accountStatus: AccountStatus.ACTIVATED },
        { where: { id: doctorId321 } }
    );

    await DoctorsService.addSpecialization(doctorId321, appointmentTypeId);
    await DoctorsService.addSpecialization(doctorId321, appointmentTypeId2);

    /*
  KLINIKA 2
  */

    const tNow = moment().set({ hour: 9, minute: 0, second: 0 });
    await LeaveRequests.create({
        userId: doctorId321,
        clinicId: id,
        from: tNow.unix(),
        to: tNow.add({ day: 7 }).unix(),
        status: 1,
        reason: 'You good',
    });

    await Operations.findAll({});

    const now = moment().set({ hour: 12, minute: 0, second: 0 });

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

    const { userId: patient1Id } = await PatientMedicalRecord.create({
        userId,
    });

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

    const { userId: patient2Id } = await PatientMedicalRecord.create({
        userId: userId2,
    });

    await ConfirmedAppointmentService.add({
        priceListId,
        doctorId,
        patientId: patient1Id,
        roomId,
        start: now.unix(),
        duration: 30,
    });

    await ConfirmedAppointmentService.add({
        priceListId,
        doctorId,
        patientId: patient2Id,
        roomId,
        start: now.add(3, 'hour').unix(),
        duration: 30,
    });

    const { id: confId2 } = await ConfirmedAppointmentService.add({
        priceListId,
        doctorId: doctorId2,
        patientId: patient1Id,
        roomId,
        start: now.add(-31, 'day').unix(),
        duration: 30,
    });

    await AppointmentReports.create({
        patientMedicalRecordId: userId,
        confirmedAppointmentId: confId2,
        diagnosisId: diagnosisId,
        clinicId: id,
    });

    await FreeAppointments.create({
        priceListId,
        doctorId,
        roomId,
        clinicId: id,
        duration: 30,
        start: moment()
            .set({ hour: 12, minute: 0, second: 0 })
            .add(2, 'hour')
            .unix(),
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

    const { id: operationRequests } = await OperationRequests.create({
        clinicId: id,
        doctorId,
        patientMedicalRecordId: patient1Id,
        start: moment()
            .set({ hour: 12, minute: 0, second: 0 })
            .add({ day: 1, hour: 4 })
            .unix(),
        duration: 30,
    });

    const { id: operationId } = await Operations.create({
        clinicId: id,
        doctorId,
        roomId,
        patientMedicalRecordId: patient1Id,
        start: moment()
            .set({ hour: 12, minute: 0, second: 0 })
            .add({ day: 1, hour: 4 })
            .unix(),
        duration: 30,
    });

    const { id: operationAttendanceId } = await OperationAttendances.create({
        doctorId: doctorId2,
        operationId,
    });
    await ClinicRating.create({
        patientId: userId,
        clinicId: id,
        serviceRating: 4,
        cleanlinessRating: 3,
        timeRating: 2,
        averageRating: 3,
        comment: 'OKAY',
    });

    await ClinicRating.create({
        patientId: userId2,
        clinicId: id,
        serviceRating: 5,
        cleanlinessRating: 4,
        timeRating: 3,
        averageRating: 4,
        comment: 'GOOD',
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

    await DoctorRating.create({
        patientId: userId2,
        doctorId: doctorId2,
        communicationRating: 1,
        expertiseRating: 2,
        timeRating: 2,
        averageRating: 1.67,
        comment: 'SUX',
    });

    // model for second clinic
    await initModelK2();
};
