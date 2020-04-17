import Vue from "vue";

const state = {
  patients: []
};

const mutations = {
  addUser(state, patient) {
    state.patients.push(patient);
  }
};

const actions = {
  async addPatientAction({ dispatch }, patientPayload) {
    try {
      const { data } = await Vue.$axios.post("/patients/register", patientPayload);
      dispatch("snackbar/showSuccess", data, {
        root: true
      });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, {
        root: true
      });
    }
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
