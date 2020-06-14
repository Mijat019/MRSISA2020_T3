
const getInitialState = () => {
  return {
    prescriptions: [],
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  addPrescription(state, prescription) {
    state.prescriptions.push(prescription);
  },

  removePrescription(state, prescription) {
    const index = state.prescriptions.findIndex(
      (el) => el.id === prescription.id
    );
    state.prescriptions.splice(index, 1);
  },

  setPrescriptions(state, prescriptions) {
    state.prescriptions = prescriptions;
  },
};

const actions = {};

const getters = {
  getPrescriptions: (state) => state.prescriptions,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
