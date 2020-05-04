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
      <v-tab-item :value="'freeApointments'">
        <ManageFreeAppointments />
      </v-tab-item>
      <v-tab-item :value="'doctors'">
        <ManageDoctors />
      </v-tab-item>
      <v-tab-item :value="'nurses'">
        <Nurses />
      </v-tab-item>
      <v-tab-item :value="'rooms'">
        <Rooms />
      </v-tab-item>
      <v-tab-item :value="'appointmentTypes'">
        <ManageAppointmentTypes />
      </v-tab-item>
      <v-tab-item :value="'report'">report</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import ManageDoctors from "./DoctorsTab/ManageDoctors";
import Nurses from "./NursesTab/Nurses";
import Rooms from "./RoomsTab/Rooms";
import ManageFreeAppointments from "./AppointmentsTab/ManageFreeAppointments";
import ManageAppointmentTypes from "./AppointmentTypesTab/ManageAppointmentTypes";
export default {
  name: "ClinicProfile",
  components: {
    ManageDoctors,
    Nurses,
    Rooms,
    ManageFreeAppointments,
    ManageAppointmentTypes
  },
  data: () => ({
    tab: null
  })
};
</script>

<style>
</style>