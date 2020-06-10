<template>
  <div>
    medical record
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#upcoming`">Upcoming</v-tab>
      <v-tab :href="`#medicalInfo`">medical info</v-tab>
      <v-tab :href="`#diagnosisHisotry`">diagnosis hisotry</v-tab>
      <v-tab :href="`#appointmentHisotry`">Appointment hisotry</v-tab>

      <v-tab-item :value="'upcoming'"> <Upcoming /> </v-tab-item>
      <v-tab-item :value="'medicalInfo'">
        <MedicalInfo :user="getUser" />
      </v-tab-item>
      <v-tab-item :value="'diagnosisHisotry'">diagnosisHisotry</v-tab-item>
      <v-tab-item :value="'appointmentHisotry'">
        <AppointmentHistory />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Upcoming from './Upcoming.vue';
import MedicalInfo from './MedicalInfo';
import AppointmentHistory from './AppointmentHistory/AppointmentHistory';

import { mapGetters } from 'vuex';
export default {
  name: 'MedicalRecordTabs',

  components: {
    MedicalInfo,
    AppointmentHistory,
    Upcoming,
  },

  data: () => ({ tab: null }),

  computed: {
    ...mapGetters({ getUser: 'authentication/getUser' }),
  },
};
</script>

<style></style>
