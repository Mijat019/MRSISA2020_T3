<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
    <v-card>
      <v-card-title v-if="type === 'add'">Add Room</v-card-title>
      <v-card-title v-else>Edit Room</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="room.name" :rules="rules" label="Name" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="type === 'edit'" color="red" @click="deleteRoom">Delete</v-btn>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn v-if="type === 'add'" color="primary" @click="addRoom">Add</v-btn>
        <v-btn v-else color="primary" @click="updateRoom">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "RoomDialog",
  data: () => ({
    rules: [
      v => !!v || "This field is required",
      v =>
        (v && v.length <= 255) ||
        "This field can't be longer than 255 characters"
    ],
    lengthRules: [
      v => v.length <= 255 || "This field can't be longer than 255 characters"
    ],

    addressList: [],
    searchAddress: null,
    isLoading: false
  }),

  methods: {
    ...mapActions("rooms", {
      addRoomAction: "addRoomAction",
      deleteRoomAction: "deleteRoomAction",
      updateRoomAction: "updateRoomAction"
    }),

    ...mapMutations("rooms", {
      close: "closeDialog"
    }),

    async addRoom() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.addRoomAction(this.room);
      this.close();
    },

    async deleteRoom() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.deleteRoomAction(this.room);
      this.close();
    },

    async updateRoom() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.updateRoomAction(this.room);
      this.close();
    }
  },

  computed: {
    ...mapGetters("rooms", {
        dialog: "getShowDialog",
        room: "getDialogRoom",
        type: "getDialogType"
    })
  }
};
</script>

<style></style>
