import Vue from "vue";

const state = {
  specTypes: [],
};

const mutations = {
  setSpecTypes(state, specTypes) {
    state.specTypes = specTypes;
  },

  addSpecType(state, newSpecType) {
    state.specTypes.push(newSpecType);
  },

  removeSpecType(state, id) {
    const index = state.specTypes.findIndex((type) => type.appointmentTypeId === id);
    state.specTypes.splice(index, 1);
  },
};

const actions = {
  async getDoctorSpecAction({ commit, dispatch }, doctorId) {
    try {
      const { data: specTypes } = await Vue.$axios.get("/doctors/spec/" + doctorId);
      commit("setSpecTypes", specTypes);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addDoctorSpecAction({ commit, dispatch }, { doctorId, appoTypeId }) {
    try {
      const { data: newSpecType } = await Vue.$axios.post(
        "/doctors/spec",
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
      await Vue.$axios.delete(`/doctors/spec`, { doctorId, appoTypeId });
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
