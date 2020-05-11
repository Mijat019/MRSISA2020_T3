const state = {
  dialogAppointmentType: {
    id: "",
    name: "",
  },
  showDialog: false,
  dialogType: "add",
};

const mutations = {
  openAddDialog(state) {
    state.dialogAppointmentType = {
      name: "",
    };
    state.showDialog = true;
    state.dialogType = "add";
  },
  openEditDialog(state, type) {
    state.dialogAppointmentType = Object.assign({}, type);
    state.showDialog = true;
    state.dialogType = "edit";
  },
  closeDialog(state) {
    state.showDialog = false;
  },
};

const getters = {
  getShowDialog: (state) => state.showDialog,
  getDialogAppointmentType: (state) => state.dialogAppointmentType,
  getDialogType: (state) => state.dialogType,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
