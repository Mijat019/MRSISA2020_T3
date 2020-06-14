import Vue from 'vue';

const getInitialState = () => {
  return {
    income: null,
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  async setIncome(state, data) {
    state.income = data;
  },
};

const actions = {
  async getIncomeAction({ commit, dispatch }, dates) {
    try {
      let { data } = await Vue.$axios.post(`/report`, dates);

      commit('setIncome', data.income);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, {
        root: true,
      });
    }
  },
};

const getters = {
  getIncome: state => state.income,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
