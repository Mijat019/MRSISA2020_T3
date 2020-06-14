import Vue from 'vue';

const getInitialState = () => {
  return {
    appointmentRequests: []
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },
  setAppointmentRequests(state, requests) {
    state.appointmentRequests = requests;
  },
  addAppointmentRequest(state, newReq) {
    state.appointmentRequests.push(newReq);
  },
  updateAppointmentRequest(state, newReq) {
    const index = state.appointmentRequests.findIndex(req => req.id === newReq.id);
    Object.assign(state.appointmentRequests[index], newReq);
  },
  removeAppointmentRequest(state, id) {
    const index = state.appointmentRequests.findIndex(type => type.id === id);
    state.appointmentRequests.splice(index, 1);
  },
};

const actions = {
  async requestAppointmentAction({ commit, dispatch }, payload) {
    try {
      const { data: newReq } = await Vue.$axios.post(
        `/appointmentRequests`,
        payload
      );
      commit('addAppointmentRequest', newReq);
      dispatch(
        'snackbar/showSuccess',
        'Appointment request successfully submited.',
        {
          root: true,
        }
      );
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async getAllForClinicAction({ commit, dispatch }, clinicId) {
    try {
      const { data: newReq } = await Vue.$axios.get(
        `/appointmentRequests/${clinicId}`
      );
      commit('setAppointmentRequests', newReq);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async updateRequestAction({ commit, dispatch }, reqPayload) {
    try {
      const {data: newReq} = await Vue.$axios.patch(`/appointmentRequests/${reqPayload.id}`, reqPayload);
      commit('updateAppointmentRequest', newReq);
      dispatch('snackbar/showSuccess', 'Request update failed', { root: true });
    } catch (error) {
      dispatch('getAllForClinicAction', reqPayload.clinicId);
      dispatch('snackbar/showError', error.response.data, { root: true });
      throw new Error("Appo request update failed");
    }
  },

  async confirmRequestAction({ commit, dispatch }, reqPayload) {
    try {
      await Vue.$axios.patch(`/appointmentRequests/confirm`, reqPayload);
      commit('removeAppointmentRequest', reqPayload.id);
      dispatch('snackbar/showSuccess', 'Approved', { root: true });
    } catch (error) {
      dispatch('getAllForClinicAction', reqPayload.clinicId);
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async rejectRequestAction({ commit, dispatch }, reqPayload) {
    try {
      await Vue.$axios.patch(`/appointmentRequests/reject`, reqPayload);
      commit('removeAppointmentRequest', reqPayload.id);
      dispatch('snackbar/showSuccess', 'Rejected', { root: true });
    } catch (error) {
      dispatch('getAllForClinicAction', reqPayload.clinicId);
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },
};

const getters = {
  getAppointmentRequests: state => state.appointmentRequests,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
