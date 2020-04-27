import Vue from "vue";

const state = {
  patientRequests: [],
};

const mutations = {
  setPatientRequests(state, data) {
    state.patientRequests = data;
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
