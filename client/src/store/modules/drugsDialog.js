const state = {
  dialogDrug: {
    id: "",
    name: "",
    price: "",
  },
  showDialog: false,
  dialogType: "add",
};

const mutations = {
  openAddDialog(state) {
    state.dialogDrug = {
      name: "",
      price: "",
    };
    state.showDialog = true;
    state.dialogType = "add";
  },
  openEditDialog(state, drug) {
    state.dialogDrug = Object.assign({}, drug);
    state.showDialog = true;
    state.dialogType = "edit";
  },
  closeDialog(state) {
    state.showDialog = false;
  },
};

const getters = {
  getShowDialog: (state) => state.showDialog,
  getDialogDrug: (state) => state.dialogDrug,
  getDialogType: (state) => state.dialogType,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
