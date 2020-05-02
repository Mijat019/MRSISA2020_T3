<template>
  <div>
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#apointments`">apointments</v-tab>
      <v-tab :href="`#calendar`">calendar</v-tab>
      <v-tab :href="`#scheduleAppointment`">Schedule an appointment</v-tab>
      <v-tab :href="`#viewPatients`">View patients</v-tab>

      <v-tab-item :value="'apointments'">apointments</v-tab-item>
      <v-tab-item :value="'calendar'">
        <CalendarTab />
      </v-tab-item>
      <v-tab-item :value="'scheduleAppointment'">scheduleAppointment</v-tab-item>
      <v-tab-item :value="'viewPatients'">viewPatients</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import CalendarTab from "./CalendarTab";
export default {
  name: "DoctorAppointmentsTabs",
  components: { CalendarTab },
  data: () => ({
    tab: null
  })
};
</script>

<style>
</style>