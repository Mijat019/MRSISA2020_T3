import Vue from "vue";

const state = {
  rooms: [],
  dialogRoom: {
      name: ""
  },
  showDialog: false,
  dialogType: "add"
};

const mutations = {
  setRooms(state, Rooms) {
    state.rooms = Rooms;
  },
  addRoom(state, newRoom) {
    state.rooms.push(newRoom);
  },
  removeRoom(state, id) {
    const index = state.rooms.findIndex(Room => Room.id === id);
    state.rooms.splice(index, 1);
  },
  updateRoom(state, newRoom) {
    const index = state.rooms.findIndex(Room => Room.id === newRoom.id);
    Object.assign(
      state.rooms[index],
      newRoom
    );
  },
  openAddDialog(state) {
    state.dialogRoom = {
        name: ""
    };
    state.showDialog = true;
    state.dialogType = "add";
  },
  openEditDialog(state, Room) {
    state.dialogRoom = Room;
    state.showDialog = true;
    state.dialogType = "edit";
  },
  closeDialog(state) {
    state.showDialog = false;
  }
};

const actions = {
  async getRoomsAction({ commit, dispatch }) {
    try {
      const { data: Rooms } = await Vue.$axios.get("/rooms");
      commit("setRooms", Rooms);
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async addRoomAction({ commit, dispatch }, RoomPayload) {
    try {
      const { data: newRoom } = await Vue.$axios.post(
        "/rooms",
        RoomPayload
      );
      commit("addRoom", newRoom);
      dispatch("snackbar/showSuccess", "Room added.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async deleteRoomAction({ commit, dispatch }, RoomPayload) {
    try {
      await Vue.$axios.post(
        "/rooms/delete",
        RoomPayload
      );
      commit("removeRoom", RoomPayload.jmbg);
      dispatch("snackbar/showSuccess", "Room removed.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },

  async updateRoomAction({ commit, dispatch }, RoomPayload) {
    try {
      const { data: newRoom } = await Vue.$axios.post(
        "/rooms/update",
        RoomPayload
      );
      commit("updateRoom", newRoom);
      dispatch("snackbar/showSuccess", "Room updated.", { root: true });
    } catch (error) {
      dispatch("snackbar/showError", error.response.data, { root: true });
    }
  },
};

const getters = {
  getRooms: (state) => state.rooms,
  getShowDialog: (state) => state.showDialog,
  getDialogRoom: (state) => state.dialogRoom,
  getDialogType: (state) => state.dialogType
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
