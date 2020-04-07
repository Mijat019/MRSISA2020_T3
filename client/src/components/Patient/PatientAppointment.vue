<template>
  <div>
    schedule an appointment
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#freeAppintments`">View free appintments</v-tab>
      <v-tab :href="`#clinics`">View clinics</v-tab>
      <v-tab :href="`#doctors`">Doctors</v-tab>

      <v-tab-item :value="'freeAppintments'">freeAppintments</v-tab-item>
      <v-tab-item :value="'clinics'">clinics</v-tab-item>
      <v-tab-item :value="'doctors'">doctors</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: "PatientAppointment",
  data: () => ({
    tab: null
  })
};
</script>

<style>
</style>