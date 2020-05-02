import ManageClinics from "../components/ClinicCenterAdmin/Clinics/ManageClinics";
import SifarnikTabs from "../components/ClinicCenterAdmin/SifarnikTabs/SifarnikTabs";
import AdministrationTabs from "../components/ClinicCenterAdmin/AdministationTabs/AdministrationTabs";
import ClinicCenterAdminPage from "../views/ClinicCenterAdminPage";

export default {
  path: "clinicCenterAdmin",
  name: "ClinicCenterAdminPage",
  component: ClinicCenterAdminPage,
  meta: {
    clinicCenterAdmin: true,
  },

  children: [
    {
      path: "administration",
      name: "AdministrationTabs",
      component: AdministrationTabs,
      meta: {
        clinicCenterAdmin: true,
      },
    },
    {
      path: "sifarnik",
      name: "SifarnikTabs",
      component: SifarnikTabs,
      meta: {
        clinicCenterAdmin: true,
      },
    },
    {
      path: "clinics",
      name: "Clinics",
      component: ManageClinics,
      meta: {
        clinicCenterAdmin: true,
      },
    },
  ],
};
