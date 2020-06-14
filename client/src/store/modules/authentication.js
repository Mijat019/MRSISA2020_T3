import Vue from 'vue';
import jwt from 'jsonwebtoken';
import router from '../../router/router';

const getInitialState = () => {
  return {
    user: null,
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  async logUser(state, data) {
    state.user = await jwt.decode(data.token);
    localStorage.setItem('token', data.token);
    Vue.$axios.defaults.headers['Authorization'] = data.token;
  },

  logoutUser(state) {
    state.user = null;
    localStorage.removeItem('token');
    Vue.$axios.defaults.headers.Authorization = '';
  },
};

const actions = {
  async login({ commit, dispatch }, credentialsPayload) {
    try {
      let { data } = await Vue.$axios.post('/auth/login', credentialsPayload);
      commit('logUser', data);
      dispatch('snackbar/showSuccess', 'You are now logged in.', {
        root: true,
      });
    } catch (error) {
      dispatch('snackbar/showError', 'Wrong email or password', {
        root: true,
      });
    }
  },

  async logout({ commit }) {
    commit('logoutUser');
  },

  async setPasswordAction({ dispatch }, payload) {
    try {
      await Vue.$axios.post('/auth/setPassword', payload);
      dispatch(
        'snackbar/showSuccess',
        "You've successfully set your password, no you can login.",
        {
          root: true,
        }
      );
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, {
        root: true,
      });
    }
  },

  async changeInfoAction({ commit, dispatch }, payload) {
    try {
      // Grab new info
      let { info } = await Vue.$axios.post('/auth/changeInfo', payload);
      commit('setInfo', info);

      dispatch('snackbar/showSuccess', 'Personal info changed.', {
        root: true,
      });
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, {
        root: true,
      });
    }
  },

  async verifyTokenAction({ commit }) {
    if (!localStorage.getItem('token')) {
      return;
    }

    try {
      Vue.$axios.defaults.headers['Authorization'] = localStorage.getItem(
        'token'
      );
      const { data } = await Vue.$axios.post('/auth/verify');
      commit('logUser', data);
    } catch (error) {
      commit('logoutUser');
      router.go();
    }
  },
};

const getters = {
  isAuthenticated: state => (state.user ? true : false),
  getUser: state => state.user,
  getRole: state => state.user?.role,
  getFullName: state => `${state.user?.firstName} ${state.user?.lastName}`,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
