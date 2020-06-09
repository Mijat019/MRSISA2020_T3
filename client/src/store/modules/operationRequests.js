import Vue from 'vue';
import moment from 'moment';

const state = {
  operationRequests: [],
};

const mutations = {
  setOperationRequests(state, operationRequests) {
    state.operationRequests = operationRequests;
  },

  removeOperationRequest(state, operationRequestId) {
    const index = state.operationRequests.findIndex(
      request => request.id === operationRequestId
    );
    state.operationRequests.splice(index, 1);
  },
};

const actions = {
  async getOperationRequestsAction({ commit, dispatch }, clinicId) {
    try {
      const { data } = await Vue.$axios.get(`/operationRequests/${clinicId}`);
      commit('setOperationRequests', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, {
        root: true,
      });
    }
  },

  async createOperationRequest({ dispatch }, operationRequestPayload) {
    try {
      await Vue.$axios.post('/operationRequests', operationRequestPayload);
      dispatch(
        'snackbar/showSuccess',
        'Request for operation was sent to the admins',
        {
          root: true,
        }
      );
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, {
        root: true,
      });
    }
  },

  async scheduleOperation({ dispatch, commit }, operationPayload) {
    try {
      await Vue.$axios.post(
        `/operations/${operationPayload.requestId}`,
        operationPayload
      );
      commit('removeOperationRequest', operationPayload.requestId);
      dispatch('snackbar/showSuccess', 'Operation scheduled', {
        root: true,
      });
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, {
        root: true,
      });
    }
  },
};

const getters = {
  getOperationRequests: state =>
    state.operationRequests.map(operationRequest => ({
      ...operationRequest,
      doctor: `${operationRequest.doctor.user.firstName} ${operationRequest.doctor.user.lastName}`,
      doctorEmail: operationRequest.doctor.user.email,
      patient: `${operationRequest.patientMedicalRecord.user.firstName} ${operationRequest.patientMedicalRecord.user.lastName}`,
      patientEmail: operationRequest.patientMedicalRecord.user.email,
      time: moment.unix(operationRequest.start).format('llll'),
    })),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
