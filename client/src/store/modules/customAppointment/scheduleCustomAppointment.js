import Vue from "vue";

const state = {
    appointmentRequests: [],
};

const mutations = {
    setAppointmentRequests(state, requests) {
        state.appointmentRequests = requests;
    },
    addAppointmentRequest(state, newReq) {
        state.appointmentRequests.push(newReq);
    },
    removeAppointmentRequest(state, id) {
        const index = state.appointmentRequests.findIndex(
            (type) => type.id === id
        );
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
            commit("addAppointmentRequest", newReq);
            dispatch(
                "snackbar/showSuccess",
                "Appointment request successfully submited.",
                {
                    root: true,
                }
            );
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async getAllForClinicAction({ commit, dispatch }, clinicId) {
        try {
            const { data: newReq } = await Vue.$axios.get(
                `/appointmentRequests/${clinicId}`
            );
            commit("setAppointmentRequests", newReq);
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async confirmRequestAction({ commit, dispatch }, reqPayload) {
        try {
            await Vue.$axios.patch(`/appointmentRequests/confirm`, reqPayload);
            commit("removeAppointmentRequest", reqPayload.id);
            dispatch("snackbar/showSuccess", "Approved", { root: true });
        } catch (error) {
            dispatch("getAllForClinicAction", reqPayload.clinicId);
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async rejectRequestAction({ commit, dispatch }, reqPayload) {
        try {
            await Vue.$axios.patch(`/appointmentRequests/reject`, reqPayload);
            commit("removeAppointmentRequest", reqPayload.id);
            dispatch("snackbar/showSuccess", "Rejected", { root: true });
        } catch (error) {
            dispatch("getAllForClinicAction", reqPayload.clinicId);
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },
};

const getters = {
    getAppointmentRequests: (state) => state.appointmentRequests,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
