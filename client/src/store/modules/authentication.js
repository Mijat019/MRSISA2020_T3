import Vue from 'vue';


const state = {
  username: "",
}

const mutations = {
  logUser(state, user) {
    state.username = user.username;
    localStorage.setItem('token', user.token);
    Vue.$axios.defaults.headers['Authorization'] = user.token;
  },

  logoutUser(state) {
    state.username = "";
    localStorage.setItem('token', '');
    Vue.$axios.defaults.headers.Authorization = '';
    // notesModule.state.notes = [];
    // userModule.state.users = [];
  },

}

const actions = {
    async login({ commit }, credentialsPayload) {
        try {
            let { data } = await Vue.$axios.post('/auth/login', credentialsPayload);
            commit('logUser', data);
            alert('uspeh');
        } catch (error) {
            alert('tuki')
        }
    },

    async logout({ commit }) {
        commit('logoutUser');
    },

    async register({ commit }, credentialsPayload) {
        try {
            let { data } = await Vue.$axios.post('/auth/register', credentialsPayload);
            commit('logUser', data);
            alert('uspeh');
        } catch (error) {
            alert('tuki')
        }
    },
}

const getters = {
    getUsername: state => state.username,
    isLogged: state => state.username || false,
}


export default {
    namespaced: true,
    state, mutations, actions, getters
}