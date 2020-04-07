import Vue from "vue";

const state = {
  doctors: [],
};

const mutations = {
  setDoctors(state, doctors) {
    state.doctors = doctors;
  },
  addDoctor(state, newDoctor) {
    state.doctors.push(newDoctor);
  },
};

const actions = {
  async getDoctorsAction({ commit, dispatch }) {
    try {
      const { data: doctors } = await Vue.$axios.get("/doctors");
      commit("setDoctors", doctors);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addDoctorAction({ commit, dispatch }, doctorPayload) {
    try {
      const { data: newDoctor } = await Vue.$axios.post(
        "/doctors",
        doctorPayload
      );
      commit("addDoctor", newDoctor);
      dispatch("snackbar/showSuccess", "Doctor added.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getDoctors: (state) => state.doctors,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
