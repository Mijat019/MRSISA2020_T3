import moment from "moment";

const state = {
    events: [],
};

const mutations = {};

const actions = {};

const getters = {
    getEvents: (state) => state.events,

    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    getAppointments: (state, getters, rootState) => {
        let appointments = [];
        appointments.push(
            ...appointmentsToEvents(rootState.freeAppointments.appointments)
        );
        appointments.push(
            ...appointmentsToEvents(
                rootState.confirmedAppointments.confirmedAppointments
            )
        );

        /* Ovo moram da uradim da bi se prikazivali 
        eventovi u ScheduleAnotherAppointment kad kreira nov*/
        state.events = appointments;
        return appointments;
    },
};

function appointmentsToEvents(appointments) {
    return appointments.map((item) => {
        const end = moment.unix(item.start);
        end.add(item.duration * 60, "seconds");
        return {
            id: item.id,
            color: item.patient ? (item.finished ? "green" : "red") : "green",
            appointmentType: item.priceList.appointmentType.name,
            roomName: item.room.name,
            name: `${item.priceList.appointmentType.name} ${item.room.name}`,
            start: moment.unix(item.start).format("YYYY-MM-DD HH:mm"),
            end: end.format("YYYY-MM-DD HH:mm"),
        };
    });
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
