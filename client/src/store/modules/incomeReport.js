import Vue from "vue";

const state = {
  income: null
};

const mutations = {
  async setIncome(state, data) {
    state.income = data;
  }
};

const actions = {
  async getIncomeAction({ commit, dispatch }, dates) {
    try {
      let { data } = await Vue.$axios.post(`/incomeReport`, dates); 
      commit("setIncome", data.income);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, {
        root: true
      });
    }
  }
};

const getters = {
  getIncome: (state) => state.income
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
