import DoctorPage from "../views/DoctorPage";
import DoctorAppointmentsTabs from "../components/Doctor/DoctorAppointmentsTabs/DoctorAppointmentsTabs";

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
      name: "DoctorAppointmentsTabs",
      component: DoctorAppointmentsTabs,
      meta: {
        doctor: true,
      },
    },
  ],
};
