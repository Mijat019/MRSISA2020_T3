import Vue from 'vue';

const state = {
  clinicRating: null,
};

const mutations = {
  setClinicRating(state, clinicRating) {
    state.clinicRating = clinicRating;
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
