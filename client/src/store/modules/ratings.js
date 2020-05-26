import Vue from 'vue';

const state = {};

const mutations = {};

const actions = {
  async submitDoctorRatingAction({ dispatch }, payload) {
    try {
      await Vue.$axios.post('/rating/doctor', payload);
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
      await Vue.$axios.post('/rating/clinic', payload);
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

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
