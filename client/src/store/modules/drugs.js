import Vue from "vue";

const state = {
  drugs: [],
};

const mutations = {
  setDrugs(state, drugs) {
    state.drugs = drugs;
  },

  addDrug(state, drug) {
    state.drugs.push(drug);
  },

  updateDrug(state, updatedDrug) {
    const index = state.drugs.findIndex((drug) => drug.id === updatedDrug.id);
    Object.assign(state.drugs[index], updatedDrug);
  },

  deleteDrug(state, id) {
    const index = state.drugs.findIndex((drug) => drug.id === id);
    state.drugs.splice(index, 1);
  },
};

const actions = {
  async getDrugsAction({ commit, dispatch }) {
    try {
      const { data: drugs } = await Vue.$axios.get("/drugs");
      commit("setDrugs", drugs);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addDrugAction({ commit, dispatch }, drugPayload) {
    try {
      const { data: newDrug } = await Vue.$axios.post("/drugs", drugPayload);
      commit("addDrug", newDrug);
      dispatch("snackbar/showSuccess", "New drug added.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async updateDrugAction({ commit, dispatch }, drugUpdate) {
    try {
      const { data: updatedDrug } = await Vue.$axios.patch(
        `/drugs/${drugUpdate.id}`,
        drugUpdate
      );
      commit("updateDrug", updatedDrug);
      dispatch("snackbar/showSuccess", "Drug updated.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async deleteDrugAction({ commit, dispatch }, drugId) {
    try {
      await Vue.$axios.delete(`/drugs/${drugId}`);
      commit("deleteDrug", drugId);
      dispatch("snackbar/showSuccess", "Drug deleted.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getDrugs: (state) => state.drugs,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
