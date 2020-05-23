<template>
  <div>
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#apointments`">apointments</v-tab>
      <v-tab :href="`#calendar`">calendar</v-tab>
      <v-tab :href="`#viewPatients`">View patients</v-tab>

      <v-tab-item :value="'apointments'">
        <Appointments />
      </v-tab-item>
      <v-tab-item :value="'calendar'">
        <CalendarTab v-on:changeTab="changeTab" />
      </v-tab-item>
      <v-tab-item :value="'viewPatients'">viewPatients</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import CalendarTab from "./CalendarTab";
import Appointments from "./Appointments/Appointments";
export default {
  name: "DoctorAppointmentsTabs",

  components: { CalendarTab, Appointments },

  data: () => ({
    tab: null
  }),

  methods: {
    changeTab(tab) {
      this.tab = tab;
    }
  }
};
</script>

<style>
</style>