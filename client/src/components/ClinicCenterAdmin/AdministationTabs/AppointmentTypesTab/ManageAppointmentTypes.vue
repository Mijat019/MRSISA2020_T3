<template>
  <v-card>
    <v-card-title>
      Appointment Types
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <!-- @click:row="showEditDialog" -->
    <AppointmentTypeDialog />
    <v-card-text>
      <v-data-table :headers="headers" :items="getAppointmentTypes" :search="search">
        <template v-slot:top>
          <v-btn dark class="mb-2" @click="showAddDialog">Add new type</v-btn>
        </template>
        <template v-slot:item.actions="item">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import AppointmentTypeDialog from "./AppointmentTypeDialog";
export default {
  name: "AppointmentTypeTable",
  components: {
    AppointmentTypeDialog
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },

  methods: {
    ...mapActions("appointmentTypes", {
      getAppointmentTypesAction: "getAppointmentTypesAction",
      deleteAppointmentTypeAction: "deleteAppointmentTypeAction"
    }),

    ...mapMutations("appointmentTypesDialog", {
      showAddDialog: "openAddDialog",
      showEditDialog: "openEditDialog"
    }),

    editItem(item) {
      this.showEditDialog(item.item);
    },

    deleteItem(item) {
      if (confirm("Are you sure you want to delete this type?")) {
        this.deleteAppointmentTypeAction(item.item.id);
      }
    }
  },

  async mounted() {
    await this.getAppointmentTypesAction();
  },

  computed: {
    ...mapGetters({
      getAppointmentTypes: "appointmentTypes/getAppointmentTypes",
      getUser: "authentication/getUser"
    })
  }
};
</script>

<style></style>
