import Vue from "vue";

const state = {
  diagnosis: [],
};

const mutations = {
  setDiagnosis(state, diagnosis) {
    state.diagnosis = diagnosis;
  },

  addDiagnosis(state, diagnosis) {
    state.diagnosis.push(diagnosis);
  },

  updateDiagnosis(state, updatedDiagnosis) {
    const index = state.diagnosis.findIndex(
      (diagnosis) => diagnosis.id === updatedDiagnosis.id
    );
    Object.assign(state.diagnosis[index], updatedDiagnosis);
  },

  deleteDiagnosis(state, id) {
    const index = state.diagnosis.findIndex((diagnosis) => diagnosis.id === id);
    state.diagnosis.splice(index, 1);
  },
};

const actions = {
  async getDiagnosisAction({ commit, dispatch }) {
    try {
      const { data: diagnosis } = await Vue.$axios.get("/diagnosis");
      commit("setDiagnosis", diagnosis);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addDiagnosisAction({ commit, dispatch }, diagnosisPayload) {
    try {
      const { data: newDiagnosis } = await Vue.$axios.post(
        "/diagnosis",
        diagnosisPayload
      );
      commit("addDiagnosis", newDiagnosis);
      dispatch("snackbar/showSuccess", "New diagnosis added.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async updateDiagnosisAction({ commit, dispatch }, diagnosisUpdate) {
    try {
      const { data: updatedDiagnosis } = await Vue.$axios.patch(
        `/diagnosis/${diagnosisUpdate.id}`,
        diagnosisUpdate
      );
      commit("updateDiagnosis", updatedDiagnosis);
      dispatch("snackbar/showSuccess", "Diagnosis updated.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async deleteDiagnosisAction({ commit, dispatch }, diagnosisId) {
    try {
      await Vue.$axios.delete(`/diagnosis/${diagnosisId}`);
      commit("deleteDiagnosis", diagnosisId);
      dispatch("snackbar/showSuccess", "Diagnosis deleted.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getDiagnosis: (state) => state.diagnosis,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
