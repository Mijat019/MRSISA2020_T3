import PatientPage from "../views/PatientPage";
import PatientAppointment from "../components/Patient/PatientAppointment";
import MedicalRecord from "../components/Patient/MedicalRecord";

export default {
  path: "patient",
  name: "PatientPage",
  component: PatientPage,
  meta: {
    authenticatedRoute: true,
    patient: true,
  },
  children: [
    {
      path: "medicalRecord",
      name: "MedicalRecord",
      component: MedicalRecord,
      meta: { authenticatedRoute: true, patient: true },
    },
    {
      path: "appointment",
      name: "PatientAppointment",
      component: PatientAppointment,
      meta: { authenticatedRoute: true, patient: true },
    },
  ],
};
