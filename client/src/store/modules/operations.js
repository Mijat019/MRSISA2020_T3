import Vue from 'vue';

const state = {
  operations: [],
};

const mutations = {
  setOperations(state, operations) {
    state.operations = operations;
  },
};

const actions = {
  async getOperationsAction({ commit, dispatch }, doctorId) {
    try {
      const { data } = await Vue.$axios.get(`/operations/doctor/${doctorId}`);
      commit('setOperations', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
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
