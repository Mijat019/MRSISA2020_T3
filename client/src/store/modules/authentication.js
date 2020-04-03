import Vue from "vue";
var jwt = require("jsonwebtoken");

const state = {
  user: { email: "" },
};

const mutations = {
  async logUser(state, data) {
    state.user = await jwt.decode(data.token);
    console.log(state.user);
    localStorage.setItem("token", data.token);
    Vue.$axios.defaults.headers["Authorization"] = data.token;
  },

  logoutUser(state) {
    state.email = "";
    localStorage.setItem("token", "");
    Vue.$axios.defaults.headers.Authorization = "";
  },
};

const actions = {
  async login({ commit, dispatch }, credentialsPayload) {
    try {
      let { data } = await Vue.$axios.post("/auth/login", credentialsPayload);
      commit("logUser", data);
      dispatch("snackbar/showSuccess", "You are now logged in.", {
        root: true,
      });
    } catch (error) {
      dispatch("snackbar/showError", "Wrong email or password", {
        root: true,
      });
    }
  },

  async logout({ commit }) {
    commit("logoutUser");
  },
};

const getters = {
  getEmail: (state) => state.email,
  isLogged: (state) => state.email || false,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
