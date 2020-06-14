import Vue from "vue";

const getInitialState = () => {
  return {
    user: null,
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  async setUser(state, data) {
    state.user = data;
  }
};

const actions = {
  async changePasswordAction({ dispatch }, payload) {
    try {
      await Vue.$axios.post("/profile/changePassword", payload);
      dispatch(
        "snackbar/showSuccess",
        "Password changed.",
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

  async changeInfoAction({ commit, dispatch }, payload) {
    try {
      // Grab new info
      let { data } = await Vue.$axios.post("/profile/info", payload); 
      commit("setUser", data);

      dispatch(
        "snackbar/showSuccess",
        "Personal info changed.",
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

  async getInfoAction({ commit, dispatch }, id) {
    try {
      let { data } = await Vue.$axios.get(`/profile/info/${id}`); 
      commit("setUser", data);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, {
        root: true,
      });
    }
  }
};

const getters = {
  getUser: (state) => state.user
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
