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
    doctors.map(doc => {doc.fullName = doc.firstName + " " + doc.lastName})
    state.doctors = doctors;
  },
  addDoctor(state, newDoctor) {
    state.doctors.push(newDoctor);
  },
  removeDoctor(state, id) {
    const index = state.doctors.findIndex((doc) => doc.id === id);
    state.doctors.splice(index, 1);
  },
  updateDoctor(state, newDoctor) {
    const index = state.doctors.findIndex((doc) => doc.id === newDoctor.id);
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
      let { data: doctors } = await Vue.$axios.get("/doctors");
      doctors = doctors.map(doc => ({
        ...doc,
        User: {
          ...doc.User,
          fullName: `${doc.User.firstName} ${doc.User.lastName}`
        }
      }));
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

  async deleteDoctorAction({ commit, dispatch }, doctorId) {
    try {
      await Vue.$axios.delete("/doctors/" + doctorId);
      commit("removeDoctor", doctorId);
      dispatch("snackbar/showSuccess", "Doctor removed.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async updateDoctorAction({ commit, dispatch }, doctorPayload) {
    try {
      const { data: newDoctor } = await Vue.$axios.patch(
        "/doctors",
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
