import ClinicAdminPage from "../views/ClinicAdminPage";
import ClinicProfile from "../components/ClinicAdmin/ClinicAdminTabs";

export default {
  path: "clinicAdmin",
  name: "ClinicAdminPage",
  component: ClinicAdminPage,
  meta: {
    clinicAdmin: true,
  },
  children: [
    {
      path: "clinicProfile",
      name: "ClinicProfile",
      component: ClinicProfile,
      meta: { clinicAdmin: true },
    },
  ],
};
