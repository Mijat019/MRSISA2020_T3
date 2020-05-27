const state = {};

const mutations = {};

const actions = {};

const getters = {
    getCurrentTimeISO: () => new Date().toISOString(),
    getCurrentDateISO: () => new Date().toISOString().slice(0, 10)
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
