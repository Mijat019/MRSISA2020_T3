import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import clinics from "./modules/clinics";
import doctors from "./modules/doctors";
import appointmentTypes from './modules/appointmentTypes'
import nurses from "./modules/nurses";
import rooms from "./modules/rooms";
import snackbar from "./modules/snackbar";
import authentication from "./modules/authentication";
import patients from "./modules/patients";
import clinicAdmins from "./modules/clinicAdmins";
import patientRequests from "./modules/patientRequests";
import freeAppointments from "./modules/freeAppointments";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: window.localStorage,
});

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  modules: {
    authentication,
    patients,
    clinics,
    doctors,
    clinicAdmins,
    nurses,
    rooms,
    snackbar,
    patientRequests,
    freeAppointments,
    appointmentTypes
  },
});
