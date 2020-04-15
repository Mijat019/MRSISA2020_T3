import UsersService from "../services/UsersService";
import UserRole from "./UserRole";
import ClinicsService from "../services/ClinicsService";
import ClinicAdminService from "../services/ClinicAdminService";
import PatientsService from "../services/PatientsService";

export default async () => {
  await UsersService.createUser(
    {
      firstName: "Mijat",
      lastName: "Miletic",
      email: "4",
      password: "4",
      jmbg: "1232132312121231231233312312",
      phoneNumber: "4",
      country: "Serbia",
      city: "Zajecar",
      address: "Vojvode stepe 20",
      accountStatus: 1,
    },
    UserRole.CLINIC_ADMIN
  );

  const { id } = await ClinicsService.add({
    name: "Nasa mala klinka",
    city: "Beograd",
    street: "Beogradska",
    streetNumber: "666",
    description: "Najgluplja  serija ikada",
  });

  const { id: idd } = await ClinicsService.add({
    name: "SNS klinika",
    city: "Beograd",
    street: "Neka tamo ulica",
    streetNumber: "420",
    description: "Izvadimo vam mozak i damo vam 100 jura",
  });

  await ClinicAdminService.add(
    {
      firstName: "Mijat",
      lastName: "Miletic",
      email: "3",
      password: "3",
      jmbg: "123213231133333322312312",
      phoneNumber: "4311",
      country: "Serbia",
      city: "Zajecar",
      address: "Vojvode stepe 20",
      accountStatus: 1,
    },
    id
  );

  await ClinicAdminService.add(
    {
      firstName: "Mijat",
      lastName: "Miletic",
      email: "s",
      password: "s",
      jmbg: "12321",
      phoneNumber: "412",
      country: "Serbia",
      city: "Zajecar",
      address: "Vojvode stepe 20",
      accountStatus: 1,
    },
    idd
  );

  await ClinicAdminService.add(
    {
      firstName: "Mijat",
      lastName: "Miletic",
      email: "13",
      password: "13",
      jmbg: "420",
      phoneNumber: "400366611",
      country: "Serbia",
      city: "Zajecar",
      address: "Vojvode stepe 20",
      accountStatus: 1,
    },
    id
  );

  await UsersService.createUser(
    {
      firstName: "Mijat",
      lastName: "Miletic",
      email: "2",
      password: "2",
      jmbg: "1232132123123123312312312",
      phoneNumber: "43",
      country: "Serbia",
      city: "Zajecar",
      address: "Vojvode stepe 20",
      accountStatus: 1,
    },
    UserRole.CLINIC_ADMIN
  );

  await UsersService.createUser(
    {
      firstName: "Mijat",
      lastName: "Miletic",
      email: "1",
      password: "1",
      jmbg: "1232312312",
      phoneNumber: "444",
      country: "Serbia",
      city: "Zajecar",
      address: "Vojvode stepe 20",
      accountStatus: 1,
    },
    UserRole.DOCTOR
  );

  await PatientsService.add({
    firstName: "Mijat",
    lastName: "Miletic",
    email: "0",
    password: "0",
    jmbg: "12321323",
    phoneNumber: "423123123",
    country: "Serbia",
    city: "Zajecar",
    address: "Vojvode stepe 20",
    accountStatus: 1,
  });
};