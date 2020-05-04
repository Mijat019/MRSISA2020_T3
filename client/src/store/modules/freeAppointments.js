import Vue from "vue";

const state = {
    appointments: [],
    dialogAppointment: {
        id: "",
        appointmentType: "",
        doctor: "",
        room : "",
        start : "",
        date : "",
        duration : 30,
    },
    showDialog: false,
    dialogType: "add",
};

const mutations = {
    setAppointments(state, appointments) {
        state.appointments = appointments;
    },
    addAppointment(state, newAppointment) {
        state.appointments.push(newAppointment);
    },
    removeAppointment(state, id) {
        const index = state.appointments.findIndex((type) => type.id === id);
        state.appointments.splice(index, 1);
    },
    updateAppointment(state, newAppointment) {
        const index = state.appointments.findIndex(
            (type) => type.id === newAppointment.id
        );
        Object.assign(state.appointments[index], newAppointment);
    },
    openAddDialog(state) {
        state.dialogAppointment = {
            id : "",
            appointmentType: "",
            doctor: "",
            room : "",
            start : "",
            date : "",
            duration : 30,
        };
        state.showDialog = true;
        state.dialogType = "add";
    },
    openEditDialog(state, appointment) {
        state.dialogAppointment = Object.assign({}, appointment);
        state.dialogAppointment.doctor.fullName = state.dialogAppointment.doctor.firstName + " " + state.dialogAppointment.doctor.lastName;
        state.showDialog = true;
        state.dialogType = "edit";
    },
    closeDialog(state) {
        state.showDialog = false;
    },
};

const actions = {
    async getFreeAppointmentsAction({ commit, dispatch }, doctorId) {
        // no selected doctors
        if(!doctorId) {
            commit("setAppointments", []);
            return;
        }

        try {
            let { data: appointments } = await Vue.$axios.get(
                `/freeAppointments/${doctorId}`
            );
            appointments = appointments.map(app => app = convertAppointment(app));
            commit("setAppointments", appointments);
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async addFreeAppointmentAction({ commit, dispatch }, appointmentPayload) {
        try {
            const { data: newAppointment } = await Vue.$axios.post(
                '/freeAppointments/add',
                appointmentPayload
            );

            commit("addAppointment", convertAppointment(newAppointment));
            dispatch("snackbar/showSuccess", "Appointment successfully added", { root: true });
        } catch (error) {
            console.log(error);
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async updateFreeAppointmentAction({ commit, dispatch }, appointmentPayload) {
        try {
            const { data: newAppointment } = await Vue.$axios.post(
                '/freeAppointments/update',
                appointmentPayload
            );
            commit("updateAppointment", convertAppointment(newAppointment));
            dispatch("snackbar/showSuccess", "Appointment successfully added", { root: true });
        } catch (error) {
            console.log(error);
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async deleteFreeAppointmentAction({ commit, dispatch }, appointmentPayload) {
        try {
            await Vue.$axios.post(
                '/freeAppointments/delete',
                appointmentPayload
            );
            commit("removeAppointment", appointmentPayload.id);
            dispatch("snackbar/showSuccess", "Appointment successfully added", { root: true });
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },


};

const getters = {
    getFreeAppointments: (state) => state.appointments,
    getDialogAppointment: (state) => state.dialogAppointment,
    getDialogType: (state) => state.dialogType,
    getShowDialog: (state) => state.showDialog,
};

/** Use this function to convert FreeApp obj returned from back-end
 * to simpler JS object to use on front
 */
function convertAppointment(appointment) {
    let x =  {
        id : appointment.id,
        appointmentType: appointment.AppointmentType,
        doctor: appointment.DoctorAt.User,
        room : appointment.Room,
        start: appointment.start,
        date : formatDate(appointment.start),
        duration: appointment.duration,
    }
    x.doctor.fullName = x.doctor.firstName + " " + x.doctor.lastName;

    return x;
}

function formatDate(val){
    if(!val) return "";

    return val.split(".")[0].replace("T", ' ').slice(0, -3);
  }

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
