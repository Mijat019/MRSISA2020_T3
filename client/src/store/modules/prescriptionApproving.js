import Vue from 'vue';

const state = {
  reportsWithPrescriptions: [],
};

const mutations = {
  setReports(state, reports) {
    state.reportsWithPrescriptions = reports;
  },

  removeReport(state, reportId) {
    const index = state.reportsWithPrescriptions.findIndex(
      report => report.id === reportId
    );
    state.reportsWithPrescriptions.splice(index, 1);
  },
};

const actions = {
  async getReportsWithPrescriptionsAction({ commit, dispatch }, clinicId) {
    try {
      const { data } = await Vue.$axios.get(
        `/appointmentReport/approvePrescriptions/${clinicId}`
      );
      commit('setReports', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async approvePrescriptions(
    { commit, dispatch },
    { appointmentReportId, prescriptions }
  ) {
    try {
      await Vue.$axios.patch(
        `/appointmentReport/approvePrescriptions/${appointmentReportId}`,
        prescriptions
      );
      commit('removeReport', appointmentReportId);
      dispatch('snackbar/showSuccess', 'Appointment approved', { root: true });
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },
};

const getters = {
  getReportsWithPrescriptions: state => state.reportsWithPrescriptions,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
