
const getInitialState = () => {
  return {
    dialogDiagnosis: {
      id: "",
      name: "",
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
    state.dialogDiagnosis = {
      name: "",
    };
    state.showDialog = true;
    state.dialogType = "add";
  },
  openEditDialog(state, diagnosis) {
    Object.assign(state.dialogDiagnosis, diagnosis);
    state.showDialog = true;
    state.dialogType = "edit";
  },
  closeDialog(state) {
    state.showDialog = false;
  },
};

const getters = {
  getShowDialog: (state) => state.showDialog,
  getDialogDiagnosis: (state) => state.dialogDiagnosis,
  getDialogType: (state) => state.dialogType,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
