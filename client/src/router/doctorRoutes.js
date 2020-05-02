import DoctorPage from "../views/DoctorPage";
import DoctorAppointments from "../components/Doctor/DoctorAppointments";

export default {
  path: "doctor",
  name: "DoctorPage",
  component: DoctorPage,
  meta: {
    doctor: true,
  },
  children: [
    {
      path: "appointments",
      name: "DoctorAppointments",
      component: DoctorAppointments,
      meta: {
        doctor: true,
      },
    },
  ],
};
