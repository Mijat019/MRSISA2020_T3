import Vue from "vue";

const state = {
  patients: [],
};

const mutations = {
  addUser(state, patient) {
    state.patients.push(patient);
  },
};

const actions = {
  async addPatientAction({ commit, dispatch }, patientPayload) {
    try {
      const { data } = await Vue.$axios.post("/patients", patientPayload);
      commit("addUser", data);
      dispatch("snackbar/showSuccess", data, {
        root: true,
      });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, {
        root: true,
      });
    }
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
