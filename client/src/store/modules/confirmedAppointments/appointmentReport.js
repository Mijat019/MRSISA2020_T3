import Vue from "vue";

const state = {
    showComponent: "nextAppointment",
    nextAppointment: null,
};

const mutations = {
    setShowComponent(state, component) {
        state.showComponent = component;
    },

    setNextAppointment(state, appointment) {
        state.nextAppointment = appointment;
    },
};

const actions = {
    setNextAppointmentAction({ rootState, commit }, reportId) {
        let index = 0;
        if (reportId !== null) {
            index = rootState.confirmedAppointments.findIndex(
                (report) => reportId === report.id
            );
        }
        commit("setNextAppointment", rootState.confirmedAppointments[index]);
    },

    async submitAppointmentReportAction({ commit, dispatch }, report) {
        try {
            await Vue.$axios.post("/appointmentReport", report);
            commit(
                "confirmedAppointments/finishAppointment",
                report.confirmedAppointmentId,
                {
                    root: true,
                }
            );
            commit("setShowComponent", "nextAppointment");
            commit("setNextAppointment", null);
            dispatch("snackbar/showSuccess", "Appointment report created", {
                root: true,
            });
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },
};

const getters = {
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    getUnfinishedAppointment: (state, getters, rootState) => {
        const unfinishedAppointments = rootState.confirmedAppointments.filter(
            (appointment) => !appointment.finished
        );
        return unfinishedAppointments;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
