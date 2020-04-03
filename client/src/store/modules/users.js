import Vue from 'vue';


const state = {
    users : []
}

const mutations = {
    addUser(state, user) {
        state.users.push(user);
    }
}

const actions = {

    async register({ commit }, credentialsPayload) {
        try {
            let {data} = await Vue.$axios.post('/users/register', credentialsPayload);
            commit('addUser', data);
            alert('uspeh');
        } catch (error) {
            alert(error.response.data)
        }
    },
}


const getters = {}

export default {
    namespaced: true,
    state, mutations, actions, getters
}