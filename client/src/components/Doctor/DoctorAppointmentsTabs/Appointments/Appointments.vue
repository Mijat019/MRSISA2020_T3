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
      getUser: "authentication/getUser",
      getShowComponent:
        "confirmedAppointments/appointmentReport/getShowComponent",
      getNextAppointment:
        "confirmedAppointments/appointmentReport/getNextAppointment"
    })
  },

  methods: {
    ...mapActions({
      getConfirmedAppointmentsAction:
        "confirmedAppointments/getConfirmedAppointmentsAction",
      setNextAppointmentAction:
        "confirmedAppointments/appointmentReport/setNextAppointmentAction"
    })
  },

  async created() {
    await this.getConfirmedAppointmentsAction(this.getUser.id);
    this.setNextAppointmentAction();
  }
};
</script>

<style>
</style>