<template>
  <div>
    Clinic center panel
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#scheduleAppointment`">Schedule Appointment</v-tab>
      <v-tab :href="`#clinics`">Browse Clinics</v-tab>
      <v-tab :href="`#doctors`">Browse Doctors</v-tab>

      <v-tab-item :value="'scheduleAppointment'">
        <ScheduleAppointment></ScheduleAppointment>
      </v-tab-item>
      
      <v-tab-item :value="'clinics'">clinics</v-tab-item>
      <v-tab-item :value="'doctors'">doctors</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import ScheduleAppointment from "./ScheduleAppointment";
export default {
  name: "PatientAppointment",
  components: {
    ScheduleAppointment
  },
  data: () => ({
    tab: null
  })
};
</script>

<style>
</style>