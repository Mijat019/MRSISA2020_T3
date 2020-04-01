import Vue from "vue";

const state = {
    clinics: []
};

const mutations = {
    setClinics(state, clinics) {
        state.clinics = clinics;
    },
    addClinic(state, newClinic) {
        state.clinics.push(newClinic);
    }
};

const actions = {
    async getClinicsActions({ commit }) {
        try {
            const { data: clinics } = await Vue.$axios.get("/clinics");
            commit("setClinics", clinics);
        } catch (error) {
            // TODO: add snack bar call
            console.log(error);
        }
    },

    async addClinicAction({ commit }, clinicPayload) {
        try {
            console.log(clinicPayload);
            const { data: newClinic } = await Vue.$axios.post(
                "/clinics",
                clinicPayload
            );
            commit("addClinic", newClinic);
        } catch (error) {
            // TODO: add snack bar call
            console.log(error);
        }
    }
};

const getters = {
    getClinics: state => state.clinics
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
