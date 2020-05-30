import Vue from "vue";

const state = {
    confirmedAppointments: [],
};

const mutations = {
    setConfirmedAppointments(state, confirmedAppointments) {
        state.confirmedAppointments = confirmedAppointments;
    },

    addConfirmedAppointment(state, confirmedAppointment) {
        state.confirmedAppointments.push(confirmedAppointment);
    },

    finishAppointment(state, confirmedAppointmentId) {
        const index = state.confirmedAppointments.findIndex(
            (appointment) => appointment.id === confirmedAppointmentId
        );
        state.confirmedAppointments[index].finished = true;
    },
};

const actions = {
    async getConfirmedAppointmentsAction({ commit, dispatch }, doctorId) {
        if (!doctorId) {
            commit("setConfirmedAppointments", []);
            return;
        }

        try {
            const { data: appointments } = await Vue.$axios.get(
                `/confirmedAppointments/${doctorId}`
            );
            commit("setConfirmedAppointments", appointments);
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async addConfirmedAppointmentAction({ commit, dispatch }, appointment) {
        try {
            const { data } = await Vue.$axios.post(
                `/confirmedAppointments`,
                appointment
            );
            commit("calendar/addConfirmedAppointment", data, {
                root: true,
            });
            commit("addConfirmedAppointment", data);
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },
};

const getters = {
    getConfirmedAppointments: (state) => state.confirmedAppointments,
    getUnfinishedAppointment: (state) =>
        state.confirmedAppointments.filter(
            (appointment) => !appointment.finished
        ),
};

export default { namespaced: true, state, mutations, actions, getters };
