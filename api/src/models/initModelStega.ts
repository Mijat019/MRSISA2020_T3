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
  await Drugs.create({ name: "Cyanide" });

  await PriceLists.findAll();

  await UsersService.createUser(
    {
      firstName: "Zoran",
      lastName: "Mrkalj",
      email: "admin_centra",
      password: "1",
      jmbg: "1232132312121231231233312312",
      phoneNumber: "4",
      country: "Serbia",
      city: "Subotica",
      address: "Korzo 3",
      accountStatus: 1,
    },
    UserRole.CLINIC_CENTER_ADMIN
  );

  await UsersService.createUser(
    {
      firstName: "Cveta",
      lastName: "Jasminovic",
      email: "pacijent",
      password: "1",
      jmbg: "22213",
      phoneNumber: "4",
      country: "Serbia",
      city: "Subotica",
      address: "Brace Radica 13",
      accountStatus: 1,
    },
    UserRole.PATIENT
  );

  const { id } = await ClinicsService.add({
    name: "Prva klinika",
    city: "Beograd",
    address: "Neka tamo ulica",
    country: "Srbija",
    description: "Pre svih ostalih, lecili smo i cara Dusana.",
  });

  await ClinicAdminService.add(
    {
      firstName: "Savo",
      lastName: "Kosan",
      email: "admin_klinike_prva",
      jmbg: "123213231133333322312312",
      phoneNumber: "4311",
      country: "Serbia",
      city: "Zrenjanin",
      address: "Zrenjaninska ulica 10",
    },
    id
  );

  await DoctorsService.add(
    {
      firstName: "Dragan",
      lastName: "Krstic",
      email: "doktor",
      jmbg: "1232312312",
      phoneNumber: "444",
      country: "Serbia",
      city: "Zajecar",
      address: "Vojvode stepe 20",
    },
    id
  );
};
