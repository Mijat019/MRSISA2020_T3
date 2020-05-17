<template>
  <div>
    <div v-if="nextAppointment">
      <AppointmentReport
        v-on:changeComponent="changeComponent"
        :appointment="nextAppointment"
        v-if="showAppointmentReport"
      />
      <NextAppointment
        v-on:changeComponent="changeComponent"
        v-else
        :appointment="nextAppointment"
      />
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
  data: () => ({
    showAppointmentReport: false,
    nextAppointment: null
  }),

  computed: {
    ...mapGetters({
      getUnfinishedConfirmedAppointments:
        "confirmedAppointments/getUnfinishedConfirmedAppointments",
      getUser: "authentication/getUser"
    })
  },

  methods: {
    ...mapActions("confirmedAppointments", {
      getUnfinishedConfirmedAppointmentsAction:
        "getUnfinishedConfirmedAppointmentsAction"
    }),

    changeComponent(appointment) {
      this.showAppointmentReport = !this.showAppointmentReport;
      this.appointment = appointment;
    }
  },

  async created() {
    await this.getUnfinishedConfirmedAppointmentsAction(this.getUser.id);
    this.nextAppointment = this.getUnfinishedConfirmedAppointments[0];
  }
};
</script>

<style>
</style>