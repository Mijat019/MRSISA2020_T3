<template>
  <div>
    medical record
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#basicInfo`">basic info</v-tab>
      <v-tab :href="`#diagnosisHisotry`">diagnosis hisotry</v-tab>
      <v-tab :href="`#appointmentHisotry`">Appointment hisotry</v-tab>

      <v-tab-item :value="'basicInfo'">basicInfo</v-tab-item>
      <v-tab-item :value="'diagnosisHisotry'">diagnosisHisotry</v-tab-item>
      <v-tab-item :value="'appointmentHisotry'">appointmentHisotry</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: "MedicalRecord",
  data: () => ({ tab: null })
};
</script>

<style>
</style>