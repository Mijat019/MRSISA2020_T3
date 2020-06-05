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
        let index;
        if (reportId) {
            index = rootState.confirmedAppointments.confirmedAppointments.findIndex(
                (report) => reportId === report.id
            );
        } else {
            index = rootState.confirmedAppointments.confirmedAppointments.findIndex(
                (report) => !report.finished
            );
        }

        if (index !== undefined) {
            const appointment =
                rootState.confirmedAppointments.confirmedAppointments[index];
            commit("setNextAppointment", appointment);
            return;
        }

        commit("setNextAppointment", null);
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
            dispatch("setNextAppointmentAction");
            dispatch("snackbar/showSuccess", "Appointment report created", {
                root: true,
            });
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async updatePatientMedicalRecordAction(
        { dispatch },
        patientMedicalRecordUpdate
    ) {
        try {
            await Vue.$axios.patch(
                `/patientMedicalRecord/${patientMedicalRecordUpdate.userId}`,
                patientMedicalRecordUpdate
            );

            dispatch("snackbar/showSuccess", "Medical record updated.", {
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
        const unfinishedAppointments = rootState.confirmedAppointments.confirmedAppointments.filter(
            (appointment) => !appointment.finished
        );
        return unfinishedAppointments;
    },

    getNextAppointment: (state) => state.nextAppointment,
    getShowComponent: (state) => state.showComponent,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
