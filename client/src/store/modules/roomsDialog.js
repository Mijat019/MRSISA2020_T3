const state = {
  dialogRoom: {
    name: "",
  },
  showDialog: false,
  dialogType: "add",
};

const mutations = {
  openAddDialog(state) {
    state.dialogRoom = {
      name: "",
    };
    state.showDialog = true;
    state.dialogType = "add";
  },
  openEditDialog(state, room) {
    state.dialogRoom = room;
    state.showDialog = true;
    state.dialogType = "edit";
  },
  closeDialog(state) {
    state.showDialog = false;
  },
};

const getters = {
  getShowDialog: (state) => state.showDialog,
  getDialogRoom: (state) => state.dialogRoom,
  getDialogType: (state) => state.dialogType,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
