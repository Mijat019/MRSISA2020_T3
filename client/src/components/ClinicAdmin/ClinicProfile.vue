<template>
  <div>
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#basicInfo`">basicInfo</v-tab>
      <v-tab :href="`#freeApointments`">free apointments</v-tab>
      <v-tab :href="`#doctors`">doctors</v-tab>
      <v-tab :href="`#nurses`">nurses</v-tab>
      <v-tab :href="`#rooms`">rooms</v-tab>
      <v-tab :href="`#appointmentTypes`">appointment types</v-tab>
      <v-tab :href="`#report`">report</v-tab>

      <v-tab-item :value="'basicInfo'">basicInfo</v-tab-item>
      <v-tab-item :value="'freeApointments'">freeApointments</v-tab-item>
      <v-tab-item :value="'doctors'">
        <Doctors />
      </v-tab-item>
      <v-tab-item :value="'nurses'">
        <Nurses />
      </v-tab-item>
      <v-tab-item :value="'rooms'">rooms</v-tab-item>
      <v-tab-item :value="'appointmentTypes'">appointmentTypes</v-tab-item>
      <v-tab-item :value="'report'">report</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Doctors from "./Doctors/Doctors";
import Nurses from "./Nurses/Nurses";
export default {
  name: "ClinicProfile",
  components: {
    Doctors,
    Nurses
  },
  data: () => ({
    tab: null
  })
};
</script>

<style>
</style>