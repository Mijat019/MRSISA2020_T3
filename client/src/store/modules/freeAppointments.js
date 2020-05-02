import Vue from "vue";

const state = {
  appointments: [],
};

const mutations = {
  setAppointments(state, appointments) {
    state.appointments = appointments;
  },
};

const actions = {
  async getFreeAppointmentsAction({ commit, dispatch }, doctorId) {
    try {
      const { data: appointments } = await Vue.$axios.get(
        `/freeAppointments/${doctorId}`
      );
      commit("setAppointments", appointments);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getFreeAppointments: (state) => state.appointments,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};