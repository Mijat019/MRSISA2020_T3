import Vue from "vue";

const state = {
    appointmentTypes: [],
    dialogAppointmentType: {
        id: "",
        name: "",
        price: "",
    },
    showDialog: false,
    dialogType: "add",
};

const mutations = {
    setAppointmentTypes(state, types) {
        state.appointmentTypes = types;
    },
    addAppointmentType(state, newType) {
        state.appointmentTypes.push(newType);
    },
    removeAppointmentType(state, id) {
        const index = state.appointmentTypes.findIndex((type) => type.id === id);
        state.appointmentTypes.splice(index, 1);
    },
    updateAppointmentType(state, newType) {
        const index = state.appointmentTypes.findIndex(
            (type) => type.id === newType.id
        );
        Object.assign(state.appointmentTypes[index], newType);
    },
    openAddDialog(state) {
        state.dialogAppointmentType = {
            id: "",
            name: "",
            price: "",
        };
        state.showDialog = true;
        state.dialogType = "add";
    },
    openEditDialog(state, type) {
        state.dialogAppointmentType = Object.assign({}, type);
        state.showDialog = true;
        state.dialogType = "edit";
    },
    closeDialog(state) {
        state.showDialog = false;
    },
};

const actions = {
    async getAppointmentTypesAction({ commit, dispatch }) {
        try {
            const { data: types } = await Vue.$axios.get("/appointmentTypes");
            commit("setAppointmentTypes", types);
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async addAppointmentTypeAction({ commit, dispatch }, typePayload) {
        try {
            const { data: newType } = await Vue.$axios.post(
                "/appointmentTypes",
                typePayload
            );
            commit("addAppointmentType", newType);
            dispatch("snackbar/showSuccess", "Appointment successfully added.", { root: true });
        } catch (error) {
            console.log(error);
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async deleteAppointmentTypeAction({ commit, dispatch }, typePayload) {
        try {
            await Vue.$axios.post("/appointmentTypes/delete", typePayload);
            commit("removeAppointmentType", typePayload.id);
            dispatch("snackbar/showSuccess", "Appointment successfully removed.", { root: true });
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async updateAppointmentTypeAction({ commit, dispatch }, typePayload) {
        try {
            const { data: newType } = await Vue.$axios.post(
                "/appointmentTypes/update",
                typePayload
            );
            commit("updateAppointmentType", newType);
            dispatch("snackbar/showSuccess", "Appointment successfully updated.", { root: true });
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },
};

const getters = {
    getAppointmentTypes: (state) => state.appointmentTypes,
    getShowDialog: (state) => state.showDialog,
    getDialogAppointmentType: (state) => state.dialogAppointmentType,
    getDialogType: (state) => state.dialogType,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
