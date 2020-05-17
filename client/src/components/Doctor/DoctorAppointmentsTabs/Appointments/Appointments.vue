<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Patient information</v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Appointment information</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="error">Skip</v-btn>
      <v-btn color="primary">Start</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Appointments",

  data: () => ({}),

  methods: {
    ...mapActions("confirmedAppointments", {
      getUnfinishedConfirmedAppointmentsAction:
        "getUnfinishedConfirmedAppointmentsAction"
    })
  },

  computed: {
    ...mapGetters({
      getUnfinishedConfirmedAppointments:
        "confirmedAppointments/getUnfinishedConfirmedAppointments",
      getUser: "authentication/getUser"
    })
  },

  async created() {
    await this.getUnfinishedConfirmedAppointmentsAction(this.getUser.id);
    console.log(this.getUnfinishedConfirmedAppointments);
  }
};
</script>

<style>
</style>