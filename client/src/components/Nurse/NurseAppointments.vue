<template>
  <div>
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#perscriptions`">Sign persription</v-tab>
      <v-tab :href="`#calendar`">calendar</v-tab>
      <v-tab :href="`#patients`">view patients</v-tab>

      <v-tab-item :value="'perscriptions'">
        <ApprovePrescriptions />
      </v-tab-item>
      <v-tab-item :value="'calendar'">calendar</v-tab-item>
      <v-tab-item :value="'patients'">
        <ViewPatientsTab/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import ApprovePrescriptions from './Prescriptions/ApprovePrescriptions';
import ViewPatientsTab from "../MedicalStaff/ViewPatientsTab";
export default {
  name: 'NurseAppointments',
  components: { ApprovePrescriptions, ViewPatientsTab },
  data: () => ({
    tab: null,
  }),
};
</script>

<style>
</style>