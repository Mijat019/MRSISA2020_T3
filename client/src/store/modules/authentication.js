import Vue from 'vue';
var jwt = require('jsonwebtoken');

const state = {
  user: {email : ""},
}

const mutations = {
    async logUser(state, data) {
        state.user = await jwt.decode(data.token);
        console.log(state.user);
        localStorage.setItem('token', data.token);
        Vue.$axios.defaults.headers['Authorization'] = data.token;
    },

    logoutUser(state) {
        state.email = "";
        localStorage.setItem('token', '');
        Vue.$axios.defaults.headers.Authorization = '';
    },
}

const actions = {
    async login({ commit }, credentialsPayload) {
        try {
            let { data } = await Vue.$axios.post('/auth/login', credentialsPayload);
            commit('logUser', data);
            alert('uspeh');
        } catch (error) {
            alert(error.response.data)
        }
    },

    async logout({ commit }) {
        commit('logoutUser');
    },
}

const getters = {
    getEmail: state => state.email,
    isLogged: state => state.email || false,
}


export default {
    namespaced: true,
    state, mutations, actions, getters
}