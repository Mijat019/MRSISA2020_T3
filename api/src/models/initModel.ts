import moment from "moment";
import UsersService from "../services/UsersService";
import UserRole from "./UserRole";
import ClinicsService from "../services/ClinicsService";
import ClinicAdminService from "../services/ClinicAdminService";
import DoctorsService from "../services/DoctorsService";
import Drugs from "./Drugs";
import Diagnosis from "./Diagnosis";
import PriceLists from "./PriceLists";
import AppointmentTypes from "./AppointmentTypes";
import Rooms from "./Rooms";
import ConfirmedAppointments from "./ConfirmedAppointments";
import Users from "./Users";
import PatientsService from "../services/PatientsService";
import PatientMedicalRecord from "./PatientMedicalRecord";
import AccountStatus from "./AccountStatus";
import FreeAppointments from "./FreeAppointments";
import DoctorSpec from "./DoctorSpec";

export default async () => {
    await Diagnosis.create({ name: "Insane in the membrane" });
    await Diagnosis.create({ name: "Vucic" });

    await Drugs.create({ name: "Percocet" });
    await Drugs.create({ name: "Molly" });
    await Drugs.create({ name: "Percocets" });

    const { password } = await UsersService.createUser(
        {
            firstName: "Mijat",
            lastName: "Miletic",
            email: "4",
            password: "1",
            jmbg: "1232132312121231231233312312",
            phoneNumber: "4",
            country: "Serbia",
            city: "Zajecar",
            address: "Vojvode stepe 20",
            accountStatus: 1,
        },
        UserRole.CLINIC_CENTER_ADMIN
    );

    const { id } = await ClinicsService.add({
        name: "SNS klinika",
        city: "Beograd",
        address: "Neka tamo ulica",
        country: "Srbija",
        description: "Izvadimo vam mozak i damo vam 100 jura",
    });

    const { id: roomId } = await Rooms.create({
        clinicId: id,
        name: "soba neka tamo",
    });

    const { id: appointmentTypeId } = await AppointmentTypes.create({
        name: "Ocni pregled",
    });

    const { id: priceListId } = await PriceLists.create({
        clinicId: id,
        appointmentTypeId,
        price: 420,
    });

    const { userId: doctorId } = await DoctorsService.add(
        {
            firstName: "Mijat",
            lastName: "Miletic",
            email: "1",
            jmbg: "1232312312",
            phoneNumber: "444",
            country: "Serbia",
            city: "Zajecar",
            address: "Vojvode stepe 20",
            accountStatus: 1,
        },
        id
    );

    await DoctorSpec.create({ appointmentTypeId, userId: doctorId });

    await Users.update(
        { password, accountStatus: AccountStatus.ACTIVATED },
        { where: { id: doctorId } }
    );

    const { id: userId }: any = await UsersService.createUser(
        {
            firstName: "Mijat",
            lastName: "Miletic",
            email: "s",
            password: "1",
            jmbg: "123213231212123331231233312312",
            phoneNumber: "41",
            country: "Serbia",
            city: "Zajecar",
            address: "Vojvode stepe 20",
            accountStatus: 1,
        },
        UserRole.PATIENT
    );

    const { userId: patientId } = await PatientMedicalRecord.create({ userId });

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
        start: moment().add(1, "hour").unix(),
        duration: 60,
    });

    await FreeAppointments.create({
        priceListId,
        doctorId,
        roomId,
        duration: 60,
        start: moment().add(2, "hour").unix(),
    });

    const { userId: tutu } = await ClinicAdminService.add(
        {
            firstName: "Mijat",
            lastName: "Miletic",
            email: "3",
            password,
            jmbg: "123213231133333322312312",
            phoneNumber: "4311",
            country: "Serbia",
            city: "Zajecar",
            address: "Vojvode stepe 20",
            accountStatus: 1,
        },
        id
    );

    await Users.update(
        { password, accountStatus: AccountStatus.ACTIVATED },
        { where: { id: tutu } }
    );
};
