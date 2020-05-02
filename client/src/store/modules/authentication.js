import Vue from "vue";
var jwt = require("jsonwebtoken");

const state = {
  user: null,
};

const mutations = {
  async logUser(state, data) {
    state.user = await jwt.decode(data.token);
    localStorage.setItem("token", data.token);
    Vue.$axios.defaults.headers["Authorization"] = data.token;
  },

  logoutUser(state) {
    state.user = null;
    localStorage.removeItem("token");
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
  async setPasswordAction({ dispatch }, payload) {
    try {
      await Vue.$axios.post("/auth/setPassword", payload);
      dispatch(
        "snackbar/showSuccess",
        "You've successfully set your password, no you can login.",
        {
          root: true,
        }
      );
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, {
        root: true,
      });
    }
  },

  async verifyTokenAction({ commit }) {
    try {
      const { data } = await Vue.$axios.post("/auth/verify");
      commit("logUser", data);
    } catch (error) {
      commit("logoutUser");
    }
  },
};

const getters = {
  isAuthenticated: (state) => (state.user ? true : false),
  getUser: (state) => state.user,
  getRole: (state) => state.user?.role,
  getFullName: (state) => `${state.user?.firstName} ${state.user?.lastName}`,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
