import Vue from "vue";

const state = {
  appointments: [],
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
};

const actions = {
  async getFreeAppointmentsAction({ commit, dispatch }, doctorId) {
    // no selected doctors
    if (!doctorId) {
      commit("setAppointments", []);
      return;
    }

    try {
      let { data: appointments } = await Vue.$axios.get(
        `/freeAppointments/${doctorId}`
      );
      commit("setAppointments", appointments);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addFreeAppointmentAction({ commit, dispatch }, appointmentPayload) {
    try {
      const { data: newAppointment } = await Vue.$axios.post(
        "/freeAppointments",
        appointmentPayload
      );

      commit("addAppointment", newAppointment);
      dispatch("snackbar/showSuccess", "Appointment successfully added", {
        root: true,
      });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async updateFreeAppointmentAction({ commit, dispatch }, appointmentUpdate) {
    try {
      const { data: newAppointment } = await Vue.$axios.patch(
        `/freeAppointments/${appointmentUpdate.id}`,
        appointmentUpdate
      );
      commit("updateAppointment", newAppointment);
      dispatch("snackbar/showSuccess", "Appointment successfully updated", {
        root: true,
      });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async deleteFreeAppointmentAction({ commit, dispatch }, appointmentPayload) {
    try {
      await Vue.$axios.post("/freeAppointments/delete", appointmentPayload);
      commit("removeAppointment", appointmentPayload.id);
      dispatch("snackbar/showSuccess", "Appointment successfully deleted", {
        root: true,
      });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getFreeAppointments: (state) => state.appointments,
};

/** Use this function to convert FreeApp obj returned from back-end
 * to simpler JS object to use on front
 */
// function convertAppointment(appointment) {
//   let x = {
//     id: appointment.id,
//     appointmentType: appointment.AppointmentType,
//     doctor: appointment.DoctorAt.User,
//     room: appointment.Room,
//     start: appointment.start,
//     date: formatDate(appointment.start),
//     duration: appointment.duration,
//   };
//   x.doctor.fullName = x.doctor.firstName + " " + x.doctor.lastName;

//   return x;
// }

// function formatDate(val) {
//   if (!val) return "";

//   return val
//     .split(".")[0]
//     .replace("T", " ")
//     .slice(0, -3);
// }

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
