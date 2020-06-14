  const getInitialState = () => {
    return {
        dialogAppointment: {
        clinicId: "",
        priceListId: "",
        doctorId: "",
        start : "",
        duration : '30',
      },
      showDialog: false,
    }
  }
  
  const state = getInitialState();
  
  const mutations = {
    resetState(state) {
      state = getInitialState();
    },
    
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
  