import NursePage from "../views/NursePage";
import NurseAppointments from "../components/Nurse/NurseAppointments";

export default {
  path: "nurse",
  name: "NursePage",
  component: NursePage,
  meta: {
    authenticatedRoute: true,
    nurse: true,
  },
  children: [
    {
      path: "appointments",
      name: "NurseAppointments",
      component: NurseAppointments,
      meta: {
        nurse: true,
        authenticatedRoute: true,
      },
    },
  ],
};
