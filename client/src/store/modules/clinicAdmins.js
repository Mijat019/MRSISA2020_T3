import Vue from "vue";

const state = {
  clinicAdmins: [],
  doctors: [],
  myClinic: null
};

const mutations = {
  setClinicAdmins(state, clinicAdmins) {
    state.clinicAdmins = clinicAdmins;
  },
  addClinicAdmin(state, clinicAdmin) {
    state.clinicAdmins.push(clinicAdmin);
  },
  setMyClinic(state, clinic) {
    state.myClinic = clinic;
  }
};

const actions = {
  async getClinicAdminsAction({ commit, dispatch }) {
    try {
      const { data: clinicAdmins } = await Vue.$axios.get("/clinicAdmins");
      commit("setClinicAdmins", clinicAdmins);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async getMyClinicAction({ commit, dispatch }) {
    try {
      const { data: clinic } = await Vue.$axios.get("/clinicAdmins/myClinic");
      commit("setMyClinic", clinic);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addClinicAdminAction({ commit, dispatch }, clinicAdminPayload) {
    try {
      const { data: clinicAdmin } = await Vue.$axios.post(
        "/clinicAdmins",
        clinicAdminPayload
      );
      commit("addClinicAdmin", clinicAdmin);
      dispatch("snackbar/showSuccess", "Clinic admin added", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  }
};

const getters = {
  getClinicAdmins: state => state.clinicAdmins,
  getMyClinic: state => state.myClinic
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
