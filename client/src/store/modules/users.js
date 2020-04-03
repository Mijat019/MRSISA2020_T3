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
      await Vue.$axios.post("/users/register", credentialsPayload);
      dispatch("snackbar/showSuccess", "You've registered successfully.", {
        root: true,
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data);
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
