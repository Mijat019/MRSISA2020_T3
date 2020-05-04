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

    <v-btn dark class="mb-2" @click="showAddDialog">Add Room</v-btn>
    <RoomDialog></RoomDialog>

    <v-data-table
      :headers="headers"
      :items="getRooms"
      :search="search"
      @click:row="showEditDialog"
      >\
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
      ],
    };
  },

  methods: {
    ...mapActions("rooms", {
      getRoomsAction: "getRoomsAction",
    }),

    ...mapMutations("rooms", {
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
