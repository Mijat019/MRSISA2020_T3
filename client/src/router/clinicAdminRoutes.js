import ClinicAdminPage from "../views/ClinicAdminPage";
import ClinicProfile from "../components/ClinicAdmin/ClinicProfile";

export default {
  path: "clinicAdmin",
  name: "ClinicAdminPage",
  component: ClinicAdminPage,
  meta: {
    authenticatedRoute: true,
    clinicAdmin: true,
  },
  children: [
    {
      path: "clinicProfile",
      name: "ClinicProfile",
      component: ClinicProfile,
      meta: { clinicAdmin: true, authenticatedRoute: true },
    },
  ],
};
