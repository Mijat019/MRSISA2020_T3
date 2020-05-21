import Vue from "vue";

const state = {
  confirmedAppointments: [],
};

const mutations = {
  setConfirmedAppointments(state, confirmedAppointments) {
    state.confirmedAppointments = confirmedAppointments;
  },

  finishAppointment(state, confirmedAppointmentId) {
    const index = state.confirmedAppointments.findIndex(
      (appointment) => appointment.id === confirmedAppointmentId
    );
    state.confirmedAppointments[index].finished = true;
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
};

const getters = {
  getConfirmedAppointments: (state) => state.confirmedAppointments,
};

export default { namespaced: true, state, mutations, actions, getters };
