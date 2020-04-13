import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import clinics from "./modules/clinics";
import doctors from "./modules/doctors";
import snackbar from "./modules/snackbar";
import authentication from "./modules/authentication";
import users from "./modules/users";
import clinicAdmins from "./modules/clinicAdmins";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: window.localStorage
});

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  modules: {
    authentication,
    users,
    clinics,
    doctors,
    clinicAdmins,
    snackbar
  }
});
