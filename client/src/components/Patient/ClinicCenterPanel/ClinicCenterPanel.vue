<template>
  <div>
    Clinic center panel
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#scheduleAppointment`">Schedule Appointment</v-tab>
      <v-tab :href="`#clinics`">Clinics</v-tab>
      <v-tab :href="`#doctors`">Doctors</v-tab>

      <v-tab-item :value="'scheduleAppointment'">
        <ScheduleAppointment></ScheduleAppointment>
      </v-tab-item>
      
      <v-tab-item :value="'clinics'"><ClinicsTable/></v-tab-item>
      <v-tab-item :value="'doctors'"><DoctorsTable/></v-tab-item>

    </v-tabs>
  </div>
</template>

<script>
import ScheduleAppointment from "./FreeAppos/ScheduleAppointment";
import ClinicsTable from './Clinics/ClinicsTable'
import DoctorsTable from './Doctors/DoctorsTable'

export default {
  name: "PatientAppointment",
  components: {
    ScheduleAppointment,
    ClinicsTable,
    DoctorsTable
  },
  data: () => ({
    tab: null
  })
};
</script>

<style>
</style>