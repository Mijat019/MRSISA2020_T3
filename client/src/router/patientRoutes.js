import PatientPage from "../views/PatientPage";
import ClinicCenterPanel from "../components/Patient/ClinicCenterPanel/ClinicCenterPanel";
import MedicalRecordTabs from "../components/Patient/MedicalRecordTabs/MedicalRecordTabs";

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
      name: "MedicalRecordTabs",
      component: MedicalRecordTabs,
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
