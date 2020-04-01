import Vue from 'vue';
var jwt = require('jsonwebtoken');

const state = {
  user: {email : ""},
}

const mutations = {
    logUser(state, user) {
        state.email = user.email;
        localStorage.setItem('token', user.token);
        Vue.$axios.defaults.headers['Authorization'] = user.token;
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
            console.log(jwt.decode(data.token));
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