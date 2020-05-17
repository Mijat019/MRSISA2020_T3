<template>
  <div>
    <AppointmentReport v-if="showAppointmentReport" />
    <NextAppointment v-else />
  </div>
</template>

<script>
import AppointmentReport from "./AppointmentReport";
import NextAppointment from "./NextAppointment";
export default {
  name: "Appointments",
  components: { AppointmentReport, NextAppointment },
  data: () => ({
    showAppointmentReport: false
  })
};
</script>

<style>
</style>