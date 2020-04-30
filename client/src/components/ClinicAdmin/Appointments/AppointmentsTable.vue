<template>
  <v-card>
    <v-card-title>Appointments for clinic {{}}</v-card-title>
    <v-card-title>
      <v-select
        :items="getDoctors"
        item-text="firstName"
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
      <v-data-table :headers="headers" :items="getAppointments" :search="search">
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AppointmentsTable",
  data: () => ({
    search: "",
    headers: [
      { text: "Date", value: "start" },
      { text: "Room", value: "Room.name" },
      { text: "Doctor", value: "DoctorAt.User.firstName" },
      { text: "Appointment type", value: "AppointmentType.name" },
      { text: "Price", value: "AppointmentType.price" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    doctor: null
  }),

  methods: {
    ...mapActions({
      getDoctorsAction: "doctors/getDoctorsAction",
      getAppointmentsAction: "appointments/getAppointmentsAction"
    })
  },

  mounted() {
    this.getDoctorsAction();
  },

  computed: {
    ...mapGetters({
      getDoctors: "doctors/getDoctors",
      getAppointments: "appointments/getAppointments"
    })
  },

  watch: {
    doctor(value) {
      this.getAppointmentsAction(value.id);
    }
  }
};
</script>

<style>
</style> 