import Vue from "vue";

const getInitialState = () => {
  return {
    patientRequests: [],
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  setPatientRequests(state, data) {
    state.patientRequests = data;
  },

  removePatientRequest(state, email) {
    const index = state.patientRequests.findIndex((el) => el.email === email);
    state.patientRequests.splice(index, 1);
  },
};

const actions = {
  async getPatientRequestsAction({ commit, dispatch }) {
    try {
      const { data } = await Vue.$axios.get("/patients/requests");
      commit("setPatientRequests", data);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async confirmPatientRequestAction({ commit, dispatch }, email) {
    try {
      await Vue.$axios.patch(`/patients/confirm/${email}`);
      commit("removePatientRequest", email);
      dispatch("snackbar/showSuccess", "Approved", { root: true });
    } catch (error) {
      dispatch("getPatientRequestsAction");
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async rejectPatientRequestAction({ commit, dispatch }, { email, reason }) {
    try {
      await Vue.$axios.patch(`/patients/reject/${email}`, { reason });
      commit("removePatientRequest", email);
      dispatch("snackbar/showSuccess", "Rejected", { root: true });
    } catch (error) {
      dispatch("getPatientRequestsAction");
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getPatientRequests: (state) => state.patientRequests,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
