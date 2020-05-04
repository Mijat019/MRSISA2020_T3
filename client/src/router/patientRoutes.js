import PatientPage from "../views/PatientPage";
import ClinicCenterPanel from "../components/Patient/ClinicCenterPanel/ClinicCenterPanel";
import MedicalRecord from "../components/Patient/MedicalRecord";

export default {
  path: "patient",
  name: "PatientPage",
  component: PatientPage,
  meta: {
    patient: true,
  },
  children: [
    {
      path: "medicalRecord",
      name: "MedicalRecord",
      component: MedicalRecord,
      meta: { patient: true },
    },
    {
      path: "cCenterPanel",
      name: "ClinicCenterPanel",
      component: ClinicCenterPanel,
      meta: { patient: true },
    },
  ],
};
