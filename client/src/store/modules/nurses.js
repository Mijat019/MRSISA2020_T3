import Vue from "vue";

const getInitialState = () => {
  return {
    nurses: [],
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  setNurses(state, nurses) {
    state.nurses = nurses;
  },
  addNurse(state, newNurse) {
    state.nurses.push(newNurse);
  },
  removeNurse(state, id) {
    const index = state.nurses.findIndex((nurse) => nurse.id === id);
    state.nurses.splice(index, 1);
  },
};

const actions = {
  async getNursesAction({ commit, dispatch }) {
    try {
      const { data: nurses } = await Vue.$axios.get("/nurses");
      commit("setNurses", nurses);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async getNursesByClinicAction({ commit, dispatch }, clinicId) {
    try {
      const { data: nurses } = await Vue.$axios.get("/nurses/" + clinicId);
      commit("setNurses", nurses);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addNurseAction({ commit, dispatch }, nursePayload) {
    try {
      const { data: newNurse } = await Vue.$axios.post("/nurses", nursePayload);
      commit("addNurse", newNurse);
      dispatch("snackbar/showSuccess", "Nurse added.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async deleteNurseAction({ commit, dispatch }, nurseId) {
    try {
      await Vue.$axios.delete("/nurses/" + nurseId);
      commit("removeNurse", nurseId);
      dispatch("snackbar/showSuccess", "Nurse removed.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getNurses: (state) => state.nurses,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
