<template>
  <v-card>
    <v-card-title>
      Rooms
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <RoomDialog></RoomDialog>

    <v-data-table :headers="headers" :items="getRooms" :search="search">
      <template v-slot:top>
        <v-btn dark class="mb-2" @click="showAddDialog">Add Room</v-btn>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="showEditDialog(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteRoomAction(item.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import RoomDialog from "./RoomDialog";
export default {
  name: "ManageRooms",
  components: {
    RoomDialog,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          value: "name",
        },
        { text: "Actoins", value: "actions", sortable: false },
      ],
    };
  },

  methods: {
    ...mapActions("rooms", {
      getRoomsAction: "getRoomsAction",
      deleteRoomAction: "deleteRoomAction",
    }),

    ...mapMutations("roomsDialog", {
      showAddDialog: "openAddDialog",
      showEditDialog: "openEditDialog",
    }),
  },

  async mounted() {
    await this.getRoomsAction(this.getUser.clinicId);
  },

  computed: {
    ...mapGetters({
      getRooms: "rooms/getRooms",
      getUser: "authentication/getUser",
    }),
  },
};
</script>

<style></style>
