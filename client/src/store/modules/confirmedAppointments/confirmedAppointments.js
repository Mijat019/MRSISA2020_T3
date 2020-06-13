import Vue from 'vue';
import calendar from './calendar';
import appointmentReport from './appointmentReport';
import moment from 'moment';

const state = {
  confirmedAppointments: [],
};

const mutations = {
  setConfirmedAppointments(state, confirmedAppointments) {
    state.confirmedAppointments = confirmedAppointments;
  },

  addConfirmedAppointment(state, confirmedAppointment) {
    state.confirmedAppointments.push(confirmedAppointment);
  },

  finishAppointment(state, confirmedAppointmentId) {
    const index = state.confirmedAppointments.findIndex(
      appointment => appointment.id === confirmedAppointmentId
    );
    state.confirmedAppointments[index].finished = true;
  },

  removeConfirmedAppointment(state, confirmedAppointmentId) {
    const index = state.confirmedAppointments.findIndex(
      appointment => appointment.id === confirmedAppointmentId
    );
    state.confirmedAppointments.splice(index, 1);
  },
};

const actions = {
  async getConfirmedAppointmentsAction({ commit, dispatch }, doctorId) {
    try {
      const { data: appointments } = await Vue.$axios.get(
        `/confirmedAppointments/${doctorId}`
      );
      commit('setConfirmedAppointments', appointments);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async getUpcomingAppointmentsAction({ commit, dispatch }, patientId) {
    try {
      const { data: appointments } = await Vue.$axios.get(
        `/confirmedAppointments/patient/${patientId}`
      );
      commit('setConfirmedAppointments', appointments);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async addConfirmedAppointmentAction({ commit, dispatch }, appointment) {
    try {
      const { data } = await Vue.$axios.post(
        `/confirmedAppointments`,
        appointment
      );
      commit('addConfirmedAppointment', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async cancelConfirmedAppointmentAction({ commit, dispatch }, appointmentId) {
    try {
      await Vue.$axios.delete(`/confirmedAppointments/${appointmentId}`);
      commit('removeConfirmedAppointment', appointmentId);
      dispatch('snackbar/showSuccess', 'Appointment canceled', { root: true });
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },
};

const getters = {
  getConfirmedAppointments: state =>
    state.confirmedAppointments.map(el => ({
      ...el,
      doctorFullName: `${el.doctor.user.firstName} ${el.doctor.user.lastName}`,
      start: moment.unix(el.start).format('lll'),
    })),
};

export default {
  modules: { calendar, appointmentReport },
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
