import moment from "moment";

const state = {};

const mutations = {};

const actions = {};

const getters = {
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    getAppointments: (state, getters, rootState) => {
        let appointments = [];
        console.log(rootState);
        appointments.push(
            ...appointmentsToEvents(rootState.freeAppointments.appointments)
        );
        appointments.push(
            ...appointmentsToEvents(
                rootState.confirmedAppointments.confirmedAppointments
            )
        );
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

// function confirmedAppointmentsToEvents(appointments) {
//     return appointments.forEach((item) => {
//         const end = moment.unix(item.start);
//         end.add(item.duration * 60, "seconds");
//         return {
//             id: item.id,
//             color: item.finished ? "grey" : "red",
//             appointmentType: item.priceList.appointmentType.name,
//             roomName: item.room.name,
//             name: `${item.priceList.appointmentType.name} ${item.room.name}`,
//             start: moment.unix(item.start).format("YYYY-MM-DD HH:mm"),
//             end: end.format("YYYY-MM-DD HH:mm"),
//         };
//     });
// }

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
