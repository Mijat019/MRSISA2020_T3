<template>
  <div>
    medical record
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#medicalInfo`">medical info</v-tab>
      <v-tab :href="`#diagnosisHisotry`">diagnosis hisotry</v-tab>
      <v-tab :href="`#appointmentHisotry`">Appointment hisotry</v-tab>

      <v-tab-item :value="'medicalInfo'">
        <MedicalInfo :user="getUser" />
      </v-tab-item>
      <v-tab-item :value="'diagnosisHisotry'">diagnosisHisotry</v-tab-item>
      <v-tab-item :value="'appointmentHisotry'">appointmentHisotry</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import MedicalInfo from "./MedicalInfo";
import { mapGetters } from "vuex";
export default {
  name: "MedicalRecordTabs",

  components: {
    MedicalInfo
  },

  data: () => ({ tab: null }),

  computed: {
    ...mapGetters({ getUser: "authentication/getUser" })
  }
};
</script>

<style>
</style>