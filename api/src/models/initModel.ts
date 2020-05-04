import UsersService from "../services/UsersService";
import UserRole from "./UserRole";
import ClinicsService from "../services/ClinicsService";
import ClinicAdminService from "../services/ClinicAdminService";
import PatientsService from "../services/PatientsService";
import AppointmentTypes from "./AppointmentTypes";
import Rooms from "./Rooms";
import DoctorsService from "../services/DoctorsService";

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
    UserRole.CLINIC_CENTER_ADMIN
  );

  const { id } = await ClinicsService.add({
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
      jmbg: "123213231133333322312312",
      phoneNumber: "4311",
      country: "Serbia",
      city: "Zajecar",
      address: "Vojvode stepe 20",
    },
    id
  );

  await DoctorsService.add(
    {
      firstName: "Mijat",
      lastName: "Miletic",
      email: "1",
      jmbg: "1232312312",
      phoneNumber: "444",
      country: "Serbia",
      city: "Zajecar",
      address: "Vojvode stepe 20",
    },
    id
  );
};
