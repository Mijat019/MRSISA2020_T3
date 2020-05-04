import Vue from "vue";

const state = {
  doctors: [],
};

const mutations = {
  setDoctors(state, doctors) {
    doctors.map((doc) => {
      doc.fullName = doc.firstName + " " + doc.lastName;
    });
    state.doctors = doctors;
  },

  addDoctor(state, newDoctor) {
    state.doctors.push(newDoctor);
  },

  removeDoctor(state, id) {
    const index = state.doctors.findIndex((doc) => doc.id === id);
    state.doctors.splice(index, 1);
  },
};

const actions = {
  async getDoctorsAction({ commit, dispatch }) {
    try {
      const { data: doctorsAt } = await Vue.$axios.get("/doctors");
      commit("setDoctors", doctorsAt);
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

  async deleteDoctorAction({ commit, dispatch }, doctorId) {
    try {
      await Vue.$axios.delete("/doctors/" + doctorId);
      commit("removeDoctor", doctorId);
      dispatch("snackbar/showSuccess", "Doctor removed.", { root: true });
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
