import Vue from "vue";

const state = {
  clinics: []
};

const mutations = {
  setClinics(state, clinics) {
    state.clinics = clinics;
  },
  addClinic(state, newClinic) {
    state.clinics.push(newClinic);
  },
  deleteClinic(state, clinicId) {
    const index = state.clinics.findIndex(clinic => clinic.id === clinicId);
    state.clinics.splice(index, 1);
  }
};

const actions = {
  async getClinicsAction({ commit, dispatch }) {
    try {
      const { data: clinics } = await Vue.$axios.get("/clinics");
      commit("setClinics", clinics);
    } catch (error) {
      console.log(error);
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addClinicAction({ commit, dispatch }, clinicPayload) {
    try {
      const { data: newClinic } = await Vue.$axios.post(
        "/clinics",
        clinicPayload
      );
      commit("addClinic", newClinic);
      dispatch("snackbar/showSuccess", "Clinic added.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async deleteClinicAction({ commit, dispatch }, clinicId) {
    try {
      await Vue.$axios.delete(`/clinics/${clinicId}`);
      commit("deleteClinic", clinicId);
      dispatch("snackbar/showSuccess", "Clinic deleted.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", "Error", { root: true });
    }
  }
};

const getters = {
  getClinics: state => state.clinics
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
