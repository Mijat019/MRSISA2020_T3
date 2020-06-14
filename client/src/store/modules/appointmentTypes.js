import Vue from "vue";

const getInitialState = () => {
    return {
      appointmentTypes: []
    }
  }
  
  const state = getInitialState();
  
  const mutations = {
    resetState(state) {
      state = getInitialState();
    },
  
    setAppointmentTypes(state, types) {
        state.appointmentTypes = types;
    },
    addAppointmentType(state, newType) {
        state.appointmentTypes.push(newType);
    },
    removeAppointmentType(state, id) {
        const index = state.appointmentTypes.findIndex(
            (type) => type.id === id
        );
        state.appointmentTypes.splice(index, 1);
    },
    updateAppointmentType(state, newType) {
        const index = state.appointmentTypes.findIndex(
            (type) => type.id === newType.id
        );
        Object.assign(state.appointmentTypes[index], newType);
    },
};

const actions = {
    async getAppointmentTypesAction({ commit, dispatch }) {
        try {
            const { data: types } = await Vue.$axios.get(`/appointmentTypes/`);
            commit("setAppointmentTypes", types);
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async addAppointmentTypeAction({ commit, dispatch }, typePayload) {
        try {
            const { data: newType } = await Vue.$axios.post(
                `/appointmentTypes`,
                typePayload
            );
            commit("addAppointmentType", newType);
            dispatch(
                "snackbar/showSuccess",
                "Appointment successfully added.",
                {
                    root: true,
                }
            );
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async deleteAppointmentTypeAction({ commit, dispatch }, appointmentTypeId) {
        try {
            await Vue.$axios.delete(`/appointmentTypes/${appointmentTypeId}`);
            commit("removeAppointmentType", appointmentTypeId);
            dispatch(
                "snackbar/showSuccess",
                "Appointment successfully removed.",
                {
                    root: true,
                }
            );
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async updateAppointmentTypeAction({ commit, dispatch }, typePayload) {
        try {
            const { data: newType } = await Vue.$axios.patch(
                `/appointmentTypes/${typePayload.id}`,
                typePayload
            );
            commit("updateAppointmentType", newType);
            dispatch(
                "snackbar/showSuccess",
                "Appointment successfully updated.",
                {
                    root: true,
                }
            );
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },
};

const getters = {
    getAppointmentTypes: (state) => state.appointmentTypes,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
