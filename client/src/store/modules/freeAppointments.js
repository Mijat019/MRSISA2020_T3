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

  async getFreeAppointmentsByTypeAction({ commit, dispatch }, typeId) {
    // no selected doctors
    if (!typeId) {
      commit("setAppointments", []);
      return;
    }

    try {
      let { data: appointments } = await Vue.$axios.get(
        `/freeAppointments/type/${typeId}`
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
      console.log(appointmentUpdate);
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

  async deleteFreeAppointmentAction({ commit, dispatch }, appointmentId) {
    try {
      await Vue.$axios.delete(`/freeAppointments/${appointmentId}`);
      commit("removeAppointment", appointmentId);
      dispatch("snackbar/showSuccess", "Appointment successfully deleted", {
        root: true,
      });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async makeAppointmentAction({ commit, dispatch }, { appoId, patientId }) {
    try {
      await Vue.$axios.post(`/freeAppointments/schedule`, {
        appoId,
        patientId,
      });
      commit("removeAppointment", appoId);
      dispatch("snackbar/showSuccess", "Appointment successfully confirmed", {
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

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
