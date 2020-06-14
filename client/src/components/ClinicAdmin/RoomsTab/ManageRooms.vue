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

    <RoomDialog />
    <RoomOccupancyDialog />

    <v-card-text>
      <v-data-table :headers="headers" :items="getRooms" :search="search">
        <template v-slot:top>
          <v-btn dark class="mb-2" @click="showAddDialog">Add Room</v-btn>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="showEditDialog(item)">mdi-pencil</v-icon> 
          <v-icon small @click="deleteRoomAction(item.id)">mdi-delete</v-icon> 
          <v-icon small @click="showOccupancyDialog(item.id)">mdi-calendar</v-icon> 
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import RoomDialog from './RoomDialog';
import RoomOccupancyDialog from './RoomOccupancyDialog';
export default {
  name: 'ManageRooms',
  components: {
    RoomDialog,
    RoomOccupancyDialog
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
        },
      ],
    };
  },

  methods: {
    ...mapActions('rooms', {
      getRoomsAction: 'getRoomsAction',
      deleteRoomAction: 'deleteRoomAction',
    }),

    ...mapActions('roomOccupancyDialog', {
      pullOccupancies: "pullOccupancies"
    }),

    ...mapMutations('roomsDialog', {
      showAddDialog: 'openAddDialog',
      showEditDialog: 'openEditDialog',
    }),

    ...mapMutations('roomOccupancyDialog', {
      openOccupancyDialog: 'openDialog',
    }),

    showOccupancyDialog(roomId) {
      this.pullOccupancies(roomId);
      this.openOccupancyDialog();
    }
  },

  async mounted() {
    await this.getRoomsAction(this.getUser.clinicId);
  },

  computed: {
    ...mapGetters({
      getRooms: 'rooms/getRooms',
      getUser: 'authentication/getUser',
    }),
  },
};
</script>

<style></style>
