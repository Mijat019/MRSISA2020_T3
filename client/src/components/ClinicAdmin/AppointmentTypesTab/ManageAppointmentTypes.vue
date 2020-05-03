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

    <v-btn dark class="mb-2" @click="showAddDialog">Add new type</v-btn>
    <AppointmentTypeDialog/>
    <v-data-table
      :headers="headers"
      :items="getAppointmentTypes"
      :search="search"
      @click:row="showEditDialog"
    >\</v-data-table>
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
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Price",
          value: "price"
        }
      ]
    };
  },

  methods: {
    ...mapActions("appointmentTypes", {
      getAppointmentTypesAction: "getAppointmentTypesAction"
    }),

    ...mapMutations("appointmentTypes", {
      showAddDialog: "openAddDialog",
      showEditDialog: "openEditDialog"
    })
  },

  async mounted() {
    await this.getAppointmentTypesAction();
  },

  computed: {
    ...mapGetters("appointmentTypes", {
      getAppointmentTypes: "getAppointmentTypes"
    })
  }
};
</script>

<style>
</style>