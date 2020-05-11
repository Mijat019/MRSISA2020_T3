import UsersService from "../services/UsersService";
import UserRole from "./UserRole";
import ClinicsService from "../services/ClinicsService";
import ClinicAdminService from "../services/ClinicAdminService";
import DoctorsService from "../services/DoctorsService";
import Drugs from "./Drugs";
import Diagnosis from "./Diagnosis";
import PriceLists from './PriceLists'

export default async () => {
  await Diagnosis.create({ name: "Loco" });
  await Diagnosis.create({ name: "Insane in the membrane" });
  await Diagnosis.create({ name: "Vucic" });

  await Drugs.create({ name: "Percocet" });
  await Drugs.create({ name: "Molly" });
  await Drugs.create({ name: "Percocets" });

  await PriceLists.findAll({});

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
    address: "Neka tamo ulica",
    country: "Srbija",
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
