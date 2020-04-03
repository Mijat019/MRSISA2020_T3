import Vue from "vue";

const state = {
  clinics: [],
};

const mutations = {
  setClinics(state, clinics) {
    state.clinics = clinics;
  },
  addClinic(state, newClinic) {
    state.clinics.push(newClinic);
  },
};

const actions = {
  async getClinicsActions({ commit, dispatch }) {
    try {
      const { data: clinics } = await Vue.$axios.get("/clinics");
      commit("setClinics", clinics);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addClinicAction({ commit, dispatch }, clinicPayload) {
    try {
      const { data: newClinic } = await Vue.$axios.post(
        "/clinics",
        clinicPayload
      );
      commit("addClinic", newClinic);
      dispatch("snackbar/showSuccess", "Clinic added.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getClinics: (state) => state.clinics,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
