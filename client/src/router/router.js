import Vue from "vue";
import VueRouter from "vue-router";
import MainComponent from "../views/MainComponent";
import Register from "../views/Register";
import Login from "../views/Login";
import ClinicCenterAdminPage from "../views/ClinicCenterAdminPage";
import ClinicAdminPage from "../views/ClinicAdminPage";
import DoctorPage from "../views/DoctorPage";
import NursePage from "../views/NursePage";
import PatientPage from "../views/PatientPage";
import Clinics from "../components/ClinicCenterAdmin/Clinics/ManageClinics";
import Sifarnik from "../components/ClinicCenterAdmin/Sifarnik";
import Users from "../components/ClinicCenterAdmin/Users";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      guestRoute: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      guestRoute: true,
    },
  },
  {
    path: "/clinic",
    component: MainComponent,
    children: [
      {
        path: "clinicCenterAdmin",
        name: "ClinicCenterAdminPage",
        component: ClinicCenterAdminPage,
        meta: {
          authenticatedRoute: true,
          clinicCenterAdmin: true,
        },

        children: [
          { path: "users", name: "Users", component: Users },
          { path: "sifarnik", name: "Sifarnik", component: Sifarnik },
          { path: "clinics", name: "Clinics", component: Clinics },
        ],
      },

      {
        path: "clinicAdmin",
        name: "ClinicAdminPage",
        component: ClinicAdminPage,
        meta: {
          authenticatedRoute: true,
          clinicAdmin: true,
        },
      },
      {
        path: "doctor",
        name: "DoctorPage",
        component: DoctorPage,
        meta: {
          doctor: true,
          clinicAdmin: true,
        },
      },
      {
        path: "nurse",
        name: "NursePage",
        component: NursePage,
        meta: {
          authenticatedRoute: true,
          nurse: true,
        },
      },
      {
        path: "patient",
        name: "PatientPage",
        component: PatientPage,
        meta: {
          authenticatedRoute: true,
          patient: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
