<template>
  <v-card>
    <v-card-title>Free appointments</v-card-title>
    <v-card-title>
      <v-select
        :items="getDoctors"
        item-text="fullName"
        v-model="doctor"
        label="Select a doctor"
        return-object
      ></v-select>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <!-- @click:row="showEditDialog" -->
      <v-data-table :headers="headers" :items="getFreeAppointments" :search="search">
        <template v-slot:top>
          <slot name="top"></slot>
        </template>
        <template v-slot:item.actions="{ item }">
          <slot name="actions" :appointment="item"></slot>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "FreeAppointmentsTable",
  data: () => ({
    search: "",
    headers: [
      { text: "Date", value: "date" },
      { text: "Room", value: "room.name" },
      { text: "Doctor", value: "doctor.fullName" },
      { text: "Appointment type", value: "appointmentType.name" },
      { text: "Duration", value: "duration" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    doctor: null
  }),

  methods: {
    ...mapActions({
      getDoctorsAction: "doctors/getDoctorsAction",
      getFreeAppointmentsAction: "freeAppointments/getFreeAppointmentsAction"
    }),

    ...mapMutations("freeAppointments", {
      showAddDialog: "openAddDialog",
      showEditDialog: "openEditDialog"
    }),

  },

  mounted() {
    this.getDoctorsAction();
  },

  computed: {
    ...mapGetters({
      getDoctors: "doctors/getDoctors",
      getFreeAppointments: "freeAppointments/getFreeAppointments"
    }),
  },

  watch: {
    doctor(value) {
      this.getFreeAppointmentsAction(value.id);
    }
  }
};
</script>

<style>
</style> 