import moment from "moment";

const root = true;

const state = {
    appointments: [],
};

const mutations = {
    /**
     * This mutations should only be used
     * to reset the appointments list.
     */
    resetAppointments(state) {
        state.appointments = [];
    },

    setFreeAppointments(state, appointments) {
        appointments.forEach((item) => {
            const end = moment.unix(item.start);
            end.add(item.duration * 60, "seconds");
            state.appointments.push({
                id: item.id,
                color: "green",
                appointmentType: item.priceList.appointmentType.name,
                roomName: item.room.name,
                name: `${item.priceList.appointmentType.name} ${item.room.name}`,
                start: moment.unix(item.start).format("YYYY-MM-DD HH:mm"),
                end: end.format("YYYY-MM-DD HH:mm"),
            });
        });
    },

    setConfirmedAppointments(state, appointments) {
        appointments.forEach((item) => {
            const end = moment.unix(item.start);
            end.add(item.duration * 60, "seconds");
            state.appointments.push({
                id: item.id,
                color: item.finished ? "grey" : "red",
                appointmentType: item.priceList.appointmentType.name,
                roomName: item.room.name,
                name: `${item.priceList.appointmentType.name} ${item.room.name}`,
                start: moment.unix(item.start).format("YYYY-MM-DD HH:mm"),
                end: end.format("YYYY-MM-DD HH:mm"),
            });
        });
    },

    addConfirmedAppointment(state, appointment) {
        const end = moment.unix(appointment.start);
        end.add(appointment.duration * 60, "seconds");
        console.log(appointment);
        state.appointments.push({
            id: appointment.id,
            color: "red",
            roomName: appointment.room.name,
            appointmentType: appointment.priceList.appointmentType.name,
            name: `${appointment.priceList.appointmentType.name} ${appointment.room.name}`,
            start: moment.unix(appointment.start).format("YYYY-MM-DD HH:mm"),
            end: end.format("YYYY-MM-DD HH:mm"),
        });
    },
};

const actions = {
    async getAppointmentsForTheCalendarAction(
        { commit, dispatch, rootState },
        doctorId
    ) {
        try {
            commit("resetAppointments");
            await dispatch(
                "confirmedAppointments/getConfirmedAppointmentsAction",
                doctorId,
                { root }
            );
            commit(
                "setFreeAppointments",
                rootState.freeAppointments.appointments
            );
            await dispatch(
                "freeAppointments/getFreeAppointmentsAction",
                doctorId,
                { root }
            );
            commit(
                "setConfirmedAppointments",
                rootState.confirmedAppointments.confirmedAppointments
            );
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },
};

const getters = {
    getAppointmentsForCalendar: (state) => state.appointments,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
