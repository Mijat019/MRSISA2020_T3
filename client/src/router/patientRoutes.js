import PatientPage from "../views/PatientPage";

export default {
  path: "patient",
  name: "PatientPage",
  component: PatientPage,
  meta: {
    authenticatedRoute: true,
    patient: true,
  },
  children: [],
};
