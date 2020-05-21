import Vue from "vue";

const actions = {
  async submitAppointmentReportAction({ dispatch }, report) {
    try {
      await Vue.$axios.post("/appointmentReport", report);
      dispatch("snackbar/showSuccess", "Appointment report created", {
        root: true,
      });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

export default {
  namespaced: true,
  actions,
};
