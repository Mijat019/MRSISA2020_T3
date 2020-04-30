import Vue from "vue";

const state = {
  doctors: [],
  dialogDoctor: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    jmbg: "",
    city: "",
    country: "",
    address: "",
    phoneNumber: "",
  },
  showDialog: false,
  dialogType: "add",
};

const mutations = {
  setDoctors(state, doctors) {
    state.doctors = doctors;
  },
  addDoctor(state, newDoctor) {
    state.doctors.push(newDoctor);
  },
  removeDoctor(state, jmbg) {
    const index = state.doctors.findIndex((doc) => doc.jmbg === jmbg);
    state.doctors.splice(index, 1);
  },
  updateDoctor(state, newDoctor) {
    const index = state.doctors.findIndex((doc) => doc.jmbg === newDoctor.jmbg);
    Object.assign(state.doctors[index], newDoctor);
  },
  openAddDialog(state) {
    state.dialogDoctor = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      jmbg: "",
      city: "",
      country: "",
      address: "",
      phoneNumber: "",
    };
    state.showDialog = true;
    state.dialogType = "add";
  },
  openEditDialog(state, doctor) {
    state.dialogDoctor = doctor;
    state.showDialog = true;
    state.dialogType = "edit";
  },
  closeDialog(state) {
    state.showDialog = false;
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

  async deleteDoctorAction({ commit, dispatch }, doctorPayload) {
    try {
      await Vue.$axios.post("/doctors/delete", doctorPayload);
      commit("removeDoctor", doctorPayload.jmbg);
      dispatch("snackbar/showSuccess", "Doctor removed.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async updateDoctorAction({ commit, dispatch }, doctorPayload) {
    try {
      const { data: newDoctor } = await Vue.$axios.post(
        "/doctors/update",
        doctorPayload
      );
      commit("updateDoctor", newDoctor);
      dispatch("snackbar/showSuccess", "Doctor updated.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getDoctors: (state) => state.doctors,
  getShowDialog: (state) => state.showDialog,
  getDialogDoctor: (state) => state.dialogDoctor,
  getDialogType: (state) => state.dialogType,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
