import Vue from 'vue';

const state = {
  doctors: [],
  availableDoctors: [],
  availableTimes: [],
};

const mutations = {
  setDoctors(state, doctors) {
    doctors.map(doctor => {
      doctor.fullName = doctor.user.firstName + ' ' + doctor.user.lastName;
    });
    state.doctors = doctors;
  },

  setAvailableDoctors(state, doctors) {
    state.availableDoctors = doctors;
  },

  setTimes(state, times) {
    state.availableTimes = times;
  },

  addDoctor(state, newDoctor) {
    state.doctors.push(newDoctor);
  },

  removeDoctor(state, id) {
    const index = state.doctors.findIndex(doc => doc.user.id === id);
    state.doctors.splice(index, 1);
  },

  addSpecType(state, { doctorId, newSpecType }) {
    const i = state.doctors.findIndex(doc => doc.user.id === doctorId);
    state.doctors[i].spec.push(newSpecType);
  },

  removeSpecType(state, { doctorId, appoTypeId }) {
    const doc_i = state.doctors.findIndex(doc => doc.user.id === doctorId);
    const appo_i = state.doctors[doc_i].spec.findIndex(
      type => type.appoType.id === appoTypeId
    );

    state.doctors[doc_i].spec.splice(appo_i, 1);
  },
};

const actions = {
  async getDoctorsAction({ commit, dispatch }) {
    try {
      const { data: doctorsAt } = await Vue.$axios.get('/doctors');
      commit('setDoctors', doctorsAt);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async getAvailableDoctorsAction({ commit, dispatch }, { clinicId, start }) {
    try {
      const { data } = await Vue.$axios.get(`/doctors/${clinicId}/${start}`);
      commit('setAvailableDoctors', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async getDoctorsByClinicAction({ commit, dispatch }, clinicId) {
    try {
      const { data: doctorsAt } = await Vue.$axios.get('/doctors/' + clinicId);
      commit('setDoctors', doctorsAt);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async getDoctorsForSchedulingAction({ commit, dispatch }, payload) {
    try {
      const { data } = await Vue.$axios.post(`/doctors/schedule/`, payload);
      commit('setDoctors', data);
    } catch (error) {
      console.log(error);
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async getAvailableTimesAction({ commit, dispatch }, payload) {
    try {
      const { data } = await Vue.$axios.post(
        `/doctors/availableTimes/`,
        payload
      );
      commit('setTimes', data);
    } catch (error) {
      console.log(error);
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async addDoctorAction({ commit, dispatch }, doctorPayload) {
    try {
      const { data: newDoctor } = await Vue.$axios.post(
        '/doctors',
        doctorPayload
      );
      commit('addDoctor', newDoctor);
      dispatch('snackbar/showSuccess', 'Doctor added.', { root: true });
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async deleteDoctorAction({ commit, dispatch }, doctorId) {
    try {
      await Vue.$axios.delete(`/doctors/${doctorId}`);
      commit('removeDoctor', doctorId);
      dispatch('snackbar/showSuccess', 'Doctor removed.', { root: true });
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  // SPECIALIZATIONS
  async addDoctorSpecAction({ commit, dispatch }, { doctorId, appoTypeId }) {
    try {
      const { data } = await Vue.$axios.post('/doctorSpec', {
        doctorId,
        appoTypeId,
      });
      console.log(data);
      commit('addSpecType', { doctorId, newSpecType: data });
      dispatch('snackbar/showSuccess', 'Doctor specialization added.', {
        root: true,
      });
    } catch (error) {
      console.log(error);
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async deleteDoctorSpecAction({ commit, dispatch }, { doctorId, appoTypeId }) {
    try {
      await Vue.$axios.delete(`/doctorSpec/${doctorId}/${appoTypeId}`);
      commit('removeSpecType', { doctorId, appoTypeId });
      dispatch('snackbar/showSuccess', 'Doctor specialization removed.', {
        root: true,
      });
    } catch (error) {
      console.log(error);
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },
};

const getters = {
  getDoctors: state => state.doctors,
  getTimes: state => state.availableTimes,
  getAvailableDoctors: state => state.availableDoctors,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
