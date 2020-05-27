import Vue from "vue";

const state = {
  requests: []
};

const mutations = {
  setRequests(state, requests) {
    state.requests = requests;
  },

  addRequest(state, newRequest) {
    state.requests.push(newRequest);
  },

  removeRequest(state, id) {
    const index = state.requests.findIndex((req) => req.id === id);
    state.requests.splice(index, 1);
  },

  approveRequest(state, id) {
    const index = state.requests.findIndex((req) => req.id === id);
    state.requests[index].status = "Approved";
  },

  denyRequest(state, { id, reason }) {
    const index = state.requests.findIndex((req) => req.id === id);
    state.requests[index].status = "Denied";
    state.requests[index].reason = reason;
  }
};

const actions = {
  async getUserRequestsAction({ commit, dispatch }, userId) {
    try {
      const { data } = await Vue.$axios.get(`/leaveRequests/user/${userId}`);
      commit("setRequests", data);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async getClinicRequestsAction({ commit, dispatch }, clinicId) {
    try {
      const { data } = await Vue.$axios.get(`/leaveRequests/clinic/${clinicId}`);
      commit("setRequests", data);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async sendRequestAction({ commit, dispatch }, { userId, from, to }) {
    try {
      const { data } = await Vue.$axios.post(`/leaveRequests/user/${userId}`, { from, to });
      commit("addRequest", data);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async approveRequestAction({ commit, dispatch }, id) {
    try {
      await Vue.$axios.post(`/leaveRequests/approve/${id}`);
      commit("approveRequest", id);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async denyRequestAction({ commit, dispatch }, { id, reason }) {
    try {
      await Vue.$axios.post(`/leaveRequests/deny/${id}`, { message: reason });
      commit("denyRequest", { id, reason });
    } catch (error) {
      console.log(error);
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  }
};

const getters = {
  getRequests: (state) => state.requests,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
