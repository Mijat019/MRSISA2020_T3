import Vue from "vue";

const getInitialState = () => {
  return {
    clinicCenterAdmins: [],
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  setClinicCenterAdmins(state, clinicCenterAdmins) {
    state.clinicCenterAdmins = clinicCenterAdmins;
  },

  addClinicCenterAdmin(state, clinicCenterAdmin) {
    state.clinicCenterAdmins.push(clinicCenterAdmin);
  },
};

const actions = {
  async getClinicCenterAdminsAction({ commit, dispatch }) {
    try {
      const { data } = await Vue.$axios.get("/clinicCenterAdmins");
      commit("setClinicCenterAdmins", data);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addClinicCenterAdminAction(
    { commit, dispatch },
    clinicCenterAdminPayload
  ) {
    try {
      const { data } = await Vue.$axios.post(
        "/clinicCenterAdmins",
        clinicCenterAdminPayload
      );
      commit("addClinicCenterAdmin", data);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getClinicCenterAdmins: (state) => state.clinicCenterAdmins,
};

export default { namespaced: true, state, mutations, actions, getters };
