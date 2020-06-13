import Vue from 'vue';

const state = {
  rooms: [],
  availableRooms: [],
  availableTimes: [],
};

const mutations = {
  setRooms(state, rooms) {
    state.rooms = rooms;
  },
  setAvailableRooms(state, rooms) {
    state.availableRooms = rooms;
  },
  setAvailableTimes(state, times) {
    state.availableTimes = times;
  },
  addRoom(state, newRoom) {
    state.rooms.push(newRoom);
  },
  removeRoom(state, id) {
    const index = state.rooms.findIndex(room => room.id === id);
    state.rooms.splice(index, 1);
  },
  updateRoom(state, newRoom) {
    const index = state.rooms.findIndex(room => room.id === newRoom.id);
    Object.assign(state.rooms[index], newRoom);
  },
};

const actions = {
  async getRoomsAction({ commit, dispatch }, clinicId) {
    try {
      const { data: rooms } = await Vue.$axios.get(`/rooms/${clinicId}`);
      commit('setRooms', rooms);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async getAvailableRoomsAction({ commit, dispatch }, payload) {
    try {
      const { data: rooms } = await Vue.$axios.post(
        `/rooms/available`,
        payload
      );
      commit('setAvailableRooms', rooms);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async getAvailableTimesAction({ commit, dispatch }, payload) {
    try {
      const { data } = await Vue.$axios.post(`/rooms/availableTimes/`, payload);
      commit('setAvailableTimes', data);
    } catch (error) {
      console.log(error);
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async addRoomAction({ commit, dispatch }, roomPayload) {
    try {
      const { data: newRoom } = await Vue.$axios.post('/rooms', roomPayload);
      commit('addRoom', newRoom);
      dispatch('snackbar/showSuccess', 'Room added.', { root: true });
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async deleteRoomAction({ commit, dispatch }, roomId) {
    try {
      await Vue.$axios.delete(`/rooms/${roomId}`);
      commit('removeRoom', roomId);
      dispatch('snackbar/showSuccess', 'Room removed.', { root: true });
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async updateRoomAction({ commit, dispatch }, roomUpdate) {
    try {
      const { data: newRoom } = await Vue.$axios.patch(
        `/rooms/${roomUpdate.id}`,
        roomUpdate
      );
      commit('updateRoom', newRoom);
      dispatch('snackbar/showSuccess', 'Room updated.', { root: true });
    } catch (error) {
      dispatch('getRoomsAction', roomUpdate.clinicId);
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },
};

const getters = {
  getRooms: state => state.rooms,
  getAvailableRooms: state => state.availableRooms,
  getAvailableTimes: state => state.availableTimes,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
