import ManageClinics from "../components/ClinicCenterAdmin/Clinics/ManageClinics";
import Sifarnik from "../components/ClinicCenterAdmin/Sifarnik";
import Administration from "../components/ClinicCenterAdmin/AdministationTabs/Administration";
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
      path: "users",
      name: "Users",
      component: Administration,
      meta: {
        clinicCenterAdmin: true,
      },
    },
    {
      path: "sifarnik",
      name: "Sifarnik",
      component: Sifarnik,
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
