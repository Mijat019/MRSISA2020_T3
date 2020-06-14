import Vue from 'vue';

const getInitialState = () => {
  return {
    clinicRating: null,
    alreadyRated: {},
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  setClinicRating(state, clinicRating) {
    state.clinicRating = clinicRating;
  },

  setAlreadyRated(state, newRated) {
    Object.assign(state.alreadyRated, newRated);
  },
};

const actions = {
  async getClinicRatingAction({ commit, dispatch }) {
    try {
      const { data } = await Vue.$axios.get('/ratings/clinic');
      commit('setClinicRating', data.rating);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, {
        root: true,
      });
    }
  },

  async getAlreadyRatedAction({ commit, dispatch }, patientId) {
    try {
      const { data } = await Vue.$axios.get(`/ratings/rated/${patientId}`);
      commit('setAlreadyRated', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, {
        root: true,
      });
    }
  },

  async submitDoctorRatingAction({ dispatch }, payload) {
    try {
      await Vue.$axios.post('/ratings/doctor', payload);
      dispatch('snackbar/showSuccess', 'Doctor rating sucessfully submited!', {
        root: true,
      });
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, {
        root: true,
      });
    }
  },

  async submitClinicRatingAction({ dispatch }, payload) {
    try {
      await Vue.$axios.post('/ratings/clinic', payload);
      dispatch('snackbar/showSuccess', 'Clinic rating sucessfully submited!', {
        root: true,
      });
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, {
        root: true,
      });
    }
  },
};

const getters = {
  getClinicRating: state => state.clinicRating,
  getAlreadyRated: state => state.alreadyRated
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
