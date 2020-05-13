<template>
  <div>
    medical record
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#basicInfo`">basic info</v-tab>
      <v-tab :href="`#diagnosisHisotry`">diagnosis hisotry</v-tab>
      <v-tab :href="`#appointmentHisotry`">Appointment hisotry</v-tab>

      <v-tab-item :value="'basicInfo'">
        <BasicInfo />
      </v-tab-item>
      <v-tab-item :value="'diagnosisHisotry'">diagnosisHisotry</v-tab-item>
      <v-tab-item :value="'appointmentHisotry'">appointmentHisotry</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import BasicInfo from "./BasicInfo";
export default {
  name: "MedicalRecordTabs",

  components: {
    BasicInfo
  },

  data: () => ({ tab: null })
};
</script>

<style>
</style>