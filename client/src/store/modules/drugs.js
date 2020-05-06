import Vue from "vue";

const state = {
  drugs: [],
};

const mutations = {
  setDrugs(state, drugs) {
    state.drugs = drugs;
  },
};

const actions = {
  async getDrugsAction({ commit, dispatch }) {
    try {
      const { data: drugs } = await Vue.$axios.get("/drugs");
      commit("setDrugs", drugs);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getDrugs: (state) => state.drugs,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
