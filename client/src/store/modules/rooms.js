import Vue from "vue";

const state = {
  rooms: [],
};

const mutations = {
  setRooms(state, rooms) {
    state.rooms = rooms;
  },
  addRoom(state, newRoom) {
    state.rooms.push(newRoom);
  },
  removeRoom(state, id) {
    const index = state.rooms.findIndex((room) => room.id === id);
    state.rooms.splice(index, 1);
  },
  updateRoom(state, newRoom) {
    const index = state.rooms.findIndex((room) => room.id === newRoom.id);
    Object.assign(state.rooms[index], newRoom);
  },
};

const actions = {
  async getRoomsAction({ commit, dispatch }, clinicId) {
    try {
      const { data: rooms } = await Vue.$axios.get(`/rooms/${clinicId}`);
      commit("setRooms", rooms);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addRoomAction({ commit, dispatch }, roomPayload) {
    try {
      const { data: newRoom } = await Vue.$axios.post("/rooms", roomPayload);
      commit("addRoom", newRoom);
      dispatch("snackbar/showSuccess", "Room added.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async deleteRoomAction({ commit, dispatch }, roomId) {
    try {
      await Vue.$axios.delete(`/rooms/${roomId}`);
      commit("removeRoom", roomId);
      dispatch("snackbar/showSuccess", "Room removed.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async updateRoomAction({ commit, dispatch }, roomUpdate) {
    try {
      const { data: newRoom } = await Vue.$axios.patch(
        `/rooms/${roomUpdate.id}`,
        roomUpdate
      );
      commit("updateRoom", newRoom);
      dispatch("snackbar/showSuccess", "Room updated.", { root: true });
    } catch (error) {
      dispatch("getRoomsAction", roomUpdate.clinicId);
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getRooms: (state) => state.rooms,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
