import Vue from "vue";

const state = {
    clinics: []
};

const mutations = {
    setClinics(state, clinics) {
        state.clinics = clinics;
    }
};

const actions = {
    async getClinics({ commit }) {
        try {
            const { data: clinics } = await Vue.$axios.get("/clinics");
            commit("setClinics", clinics);
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
    state,
    mutations,
    actions,
    getters
};
