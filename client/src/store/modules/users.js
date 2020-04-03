import Vue from "vue";

const state = {
  users: [],
};

const mutations = {
  addUser(state, user) {
    state.users.push(user);
  },
};

const actions = {
  async register({ dispatch }, credentialsPayload) {
    try {
      const { data } = await Vue.$axios.post(
        "/users/register",
        credentialsPayload
      );

      dispatch("snackbar/showSuccess", data, {
        root: true,
      });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, {
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
