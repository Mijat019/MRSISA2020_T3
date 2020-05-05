const state = {
  dialogAppointment: {
    id: "",
    appointmentTypeId: "",
    doctorId: "",
    roomId: "",
    start: "",
    duration: 30,
  },
  showDialog: false,
  dialogType: "add",
};

const mutations = {
  openAddDialog(state) {
    state.dialogAppointment = {
      id: "",
      appointmentTypeId: "",
      doctorId: "",
      roomId: "",
      start: "",
      duration: 30,
    };
    state.showDialog = true;
    state.dialogType = "add";
  },
  openEditDialog(state, appointment) {
    state.dialogAppointment = Object.assign({}, appointment);
    state.showDialog = true;
    state.dialogType = "edit";
  },
  closeDialog(state) {
    state.showDialog = false;
  },
};

const getters = {
  getDialogAppointment: (state) => state.dialogAppointment,
  getDialogType: (state) => state.dialogType,
  getShowDialog: (state) => state.showDialog,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};