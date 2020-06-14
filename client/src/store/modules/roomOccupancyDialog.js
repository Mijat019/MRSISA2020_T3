import Vue from "vue";

const getInitialState = () => {
  return {
    occupancies: {
      freeAppointments: [],
      confirmedAppointments: [],
      operations: []
    },
    showDialog: false
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  openDialog(state) {
    state.showDialog = true;
  },

  closeDialog(state) {
    state.showDialog = false;
  },

  setOccupancies(state, occupancies) {
    state.occupancies = occupancies;
  }
};

const actions = {
  async pullOccupancies({ commit, dispatch }, roomId) {
    try {
      const { data: occupancies } = await Vue.$axios.get(`/rooms/occupancy/${roomId}`);
      commit("setOccupancies", occupancies);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
}

const getters = {
  getOccupancies: (state) => state.occupancies,
  getDialog: (state) => state.showDialog
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
