
const getInitialState = () => {
  return {
    dialogDrug: {
      id: "",
      name: "",
      price: "",
    },
    showDialog: false,
    dialogType: "add",
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  openAddDialog(state) {
    state.dialogDrug = {
      name: "",
      price: "",
    };
    state.showDialog = true;
    state.dialogType = "add";
  },
  openEditDialog(state, drug) {
    Object.assign(state.dialogDrug, drug);
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
