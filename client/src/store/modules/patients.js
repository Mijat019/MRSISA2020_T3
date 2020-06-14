import Vue from "vue";

const getInitialState = () => {
  return {
    patients: [],
    myPatients: []
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  addPatient(state, patient) {
    state.patients.push(patient);
  },
  setMyPatients(state, data) {
    state.myPatients = data;
  }
};

const actions = {
  async addPatientAction({ commit, dispatch }, patientPayload) {
    try {
      const { data } = await Vue.$axios.post("/patients", patientPayload);
      commit("addPatient", data);
      dispatch("snackbar/showSuccess", data, {
        root: true,
      });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, {
        root: true,
      });
    }
  },

  async getMyPatientsAction({ commit, dispatch }) {
    try {
      const { data } = await Vue.$axios.get("/myPatients/");
      commit("setMyPatients", data);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, {
        root: true,
      });
    }
  },
};

const getters = {
  getMyPatients: (state) => state.myPatients
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
