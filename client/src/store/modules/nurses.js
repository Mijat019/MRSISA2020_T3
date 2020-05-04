import Vue from "vue";

const state = {
  nurses: [],
  dialogNurse: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      jmbg: "",
      city: "",
      country: "",
      address: "",
      phoneNumber: ""
  },
  showDialog: false,
  dialogType: "add"
};

const mutations = {
  setNurses(state, nurses) {
    state.nurses = nurses;
  },
  addNurse(state, newNurse) {
    state.nurses.push(newNurse);
  },
  removeNurse(state, id) {
    const index = state.nurses.findIndex(nurse => nurse.id === id);
    state.nurses.splice(index, 1);
  },
  updateNurse(state, newNurse) {
    const index = state.nurses.findIndex(nurse => nurse.id === newNurse.id);
    Object.assign(
      state.nurses[index],
      newNurse
    );
  },
  openAddDialog(state) {
    state.dialogNurse = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        jmbg: "",
        city: "",
        country: "",
        address: "",
        phoneNumber: ""
    };
    state.showDialog = true;
    state.dialogType = "add";
  },
  openEditDialog(state, nurse) {
    state.dialogNurse = nurse;
    state.showDialog = true;
    state.dialogType = "edit";
  },
  closeDialog(state) {
    state.showDialog = false;
  }
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

  async addNurseAction({ commit, dispatch }, nursePayload) {
    try {
      const { data: newNurse } = await Vue.$axios.post(
        "/nurses",
        nursePayload
      );
      commit("addNurse", newNurse);
      dispatch("snackbar/showSuccess", "Nurse added.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async deleteNurseAction({ commit, dispatch }, nurseId) {
    try {
      await Vue.$axios.delete(
        "/nurses/" + nurseId
      );
      commit("removeNurse", nurseId);
      dispatch("snackbar/showSuccess", "Nurse removed.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async updateNurseAction({ commit, dispatch }, nursePayload) {
    try {
      const { data: newNurse } = await Vue.$axios.patch(
        "/nurses",
        nursePayload
      );
      commit("updateNurse", newNurse);
      dispatch("snackbar/showSuccess", "Nurse updated.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getNurses: (state) => state.nurses,
  getShowDialog: (state) => state.showDialog,
  getDialogNurse: (state) => state.dialogNurse,
  getDialogType: (state) => state.dialogType
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
