import Vue from "vue";

const getInitialState = () => {
  return {
    specTypes: [],
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  setSpecTypes(state, specTypes) {
    state.specTypes = specTypes;
  },

  addSpecType(state, newSpecType) {
    state.specTypes.push(newSpecType);
  },

  removeSpecType(state, id) {
    const index = state.specTypes.findIndex((type) => type.id === id);
    state.specTypes.splice(index, 1);
  },
};

const actions = {
  async getDoctorSpecAction({ commit, dispatch }, doctorId) {
    try {
      const { data: specTypes } = await Vue.$axios.get("/doctorSpec/" + doctorId);
      commit("setSpecTypes", specTypes);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addDoctorSpecAction({ commit, dispatch }, { doctorId, appoTypeId }) {
    try {
      const { data: newSpecType } = await Vue.$axios.post(
        "/doctorSpec",
        { doctorId, appoTypeId }
      );
      commit("addSpecType", newSpecType);
      dispatch("snackbar/showSuccess", "Doctor specialization added.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async deleteDoctorSpecAction({ commit, dispatch }, { doctorId, appoTypeId }) {
    try {
      await Vue.$axios.delete(`/doctorSpec/${doctorId}/${appoTypeId}`);
      commit("removeSpecType", appoTypeId);
      dispatch("snackbar/showSuccess", "Doctor specialization removed.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  }
};

const getters = {
  getDoctorSpec: (state) => state.specTypes,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
