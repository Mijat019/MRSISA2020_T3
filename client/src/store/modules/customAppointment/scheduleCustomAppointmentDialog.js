const state = {
    dialogAppointment: {
      clinicId: "",
      priceListId: "",
      doctorId: "",
      start : "",
      duration : '30',
    },
    showDialog: false,
  };
  
  const mutations = {
    // resets all values except clinic
    resetDialogValues(state) {
      state.dialogAppointment = {
        priceListId: "",
        doctorId: "",
        start : "",
        duration : "30",
      };
    },

    openDialog(state) {
      state.dialogAppointment = {
        clinicId: "",
        priceListId: "",
        doctorId: "",
        start : "",
        duration : '30',
      };
      state.showDialog = true;
    },
    closeDialog(state) {
      state.showDialog = false;
    },
  };
  
  const getters = {
    getShowDialog: (state) => state.showDialog,
    getDialogAppointment: (state) => state.dialogAppointment,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    getters,
  };
  