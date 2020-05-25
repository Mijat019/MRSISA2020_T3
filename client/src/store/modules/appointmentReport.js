import Vue from "vue";

const state = {
  showComponent: "nextAppointment",
  unfinishedConfirmedAppointments: [],
  nextAppointment: null,
  patientReports: [],
};

const mutations = {
  setPatientReports(state, reports) {
    state.patientReports = reports;
  },

  setUnfinishedConfirmedAppointments(state, appointments) {
    state.unfinishedConfirmedAppointments = appointments;
  },

  removeFirstAppointment(state, confirmedAppointmentId) {
    const index = state.unfinishedConfirmedAppointments.findIndex(
      (appointment) => appointment.id === confirmedAppointmentId
    );
    state.unfinishedConfirmedAppointments.splice(index, 1);
  },

  setShowComponent(state, component) {
    state.showComponent = component;
  },

  setNextAppointment(state, reportId) {
    if (reportId !== null) {
      const index = state.unfinishedConfirmedAppointments.findIndex(
        (report) => reportId === report.id
      );
      state.nextAppointment = state.unfinishedConfirmedAppointments[index];
      return;
    }

    state.nextAppointment = state.unfinishedConfirmedAppointments[0];
  },
};

const actions = {
  async getReportsForPatientAction({ commit, dispatch }, patientId) {
    try{
      const {data: reports } = await Vue.$axios.get(`/appointmentReport/${patientId}`);
      commit('setPatientReports', reports)
    }catch(error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }

  },

  async getUnfinishedConfirmedAppointmentsAction(
    { commit, dispatch },
    doctorId
  ) {
    try {
      const { data: appointments } = await Vue.$axios.get(
        `/confirmedAppointments/unfinishedForToday/${doctorId}`
      );
      commit("setUnfinishedConfirmedAppointments", appointments);
      commit("setShowComponent", "nextAppointment");
      commit("setNextAppointment", null);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async submitAppointmentReportAction({ commit, dispatch }, report) {
    try {
      await Vue.$axios.post("/appointmentReport", report);
      commit("removeFirstAppointment", report.confirmedAppointmentId);
      commit(
        "confirmedAppointments/finishAppointment",
        report.confirmedAppointmentId,
        {
          root: true,
        }
      );
      commit("setShowComponent", "nextAppointment");
      commit("setNextAppointment", null);
      dispatch("snackbar/showSuccess", "Appointment report created", {
        root: true,
      });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async updatePatientMedicalRecordAction(
    { dispatch },
    patientMedicalRecordUpdate
  ) {
    try {
      await Vue.$axios.patch(
        `/patientMedicalRecord/${patientMedicalRecordUpdate.userId}`,
        patientMedicalRecordUpdate
      );

      dispatch("snackbar/showSuccess", "Medical record updated.", {
        root: true,
      });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getUnfinishedConfirmedAppointments: (state) =>
    state.unfinishedConfirmedAppointments,

  getNextAppointment: (state) => state.nextAppointment,
  getShowComponent: (state) => state.showComponent,
  getPatientReports: (state) => state.patientReports,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
