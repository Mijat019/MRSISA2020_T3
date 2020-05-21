<template>
  <div>
    <div v-if="getNextAppointment">
      <AppointmentReport v-if="getShowComponent === `appointmentReport`" />
      <NextAppointment v-else-if="getShowComponent === `nextAppointment`" />
    </div>

    <div v-else>You have no appointments for today.</div>
  </div>
</template>

<script>
import AppointmentReport from "./AppointmentReport";
import NextAppointment from "./NextAppointment";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Appointments",

  components: { AppointmentReport, NextAppointment },

  data: () => ({}),

  computed: {
    ...mapGetters({
      getUnfinishedConfirmedAppointments:
        "appointmentReport/getUnfinishedConfirmedAppointments",
      getUser: "authentication/getUser",
      getShowComponent: "appointmentReport/getShowComponent",
      getNextAppointment: "appointmentReport/getNextAppointment"
    })
  },

  methods: {
    ...mapActions("appointmentReport", {
      getUnfinishedConfirmedAppointmentsAction:
        "getUnfinishedConfirmedAppointmentsAction"
    })
  },

  async created() {
    await this.getUnfinishedConfirmedAppointmentsAction(this.getUser.id);
  }
};
</script>

<style>
</style>