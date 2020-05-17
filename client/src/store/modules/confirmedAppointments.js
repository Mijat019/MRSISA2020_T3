import Vue from "vue";

const state = {
  confirmedAppointments: [],
  unfinishedConfirmedAppointments: [],
};
const mutations = {
  setConfirmedAppointments(state, confirmedAppointments) {
    state.confirmedAppointments = confirmedAppointments;
  },

  setUnfinishedConfirmedAppointments(state, unfinishedConfirmedAppointments) {
    state.unfinishedConfirmedAppointments = unfinishedConfirmedAppointments;
  },
};
const actions = {
  async getConfirmedAppointmentsAction({ commit, dispatch }, doctorId) {
    // no selected doctors
    if (!doctorId) {
      commit("setConfirmedAppointments", []);
      return;
    }

    try {
      const { data: appointments } = await Vue.$axios.get(
        `/confirmedAppointments/${doctorId}`
      );
      commit("setConfirmedAppointments", appointments);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async getUnfinishedConfirmedAppointmentsAction(
    { commit, dispatch },
    doctorId
  ) {
    try {
      const { data: appointments } = await Vue.$axios.get(
        `/confirmedAppointments/unfinished/${doctorId}`
      );
      commit("setUnfinishedConfirmedAppointments", appointments);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};
const getters = {
  getConfirmedAppointments: (state) => state.confirmedAppointments,
  getUnfinishedConfirmedAppointments: (state) =>
    state.unfinishedConfirmedAppointments,
};

export default { namespaced: true, state, mutations, actions, getters };
