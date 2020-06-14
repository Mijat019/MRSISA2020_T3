import Vue from 'vue';

const getInitialState = () => {
  return {
    operationAttendances: [],
    operations: [],
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  setOperations(state, operations) {
    state.operations = operations;
  },

  setOperationAttendances(state, operationAttendances) {
    state.operationAttendances = operationAttendances;
  },
};

const actions = {
  async getOperationsAction({ commit, dispatch }, doctorId) {
    try {
      const { data } = await Vue.$axios.get(`/operations/doctor/${doctorId}`);
      commit('setOperations', data);
      const { data: doctor } = await Vue.$axios.get(
        `/operationAttendances/${doctorId}`
      );
      commit('setOperationAttendances', doctor.operationAttendances);
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
