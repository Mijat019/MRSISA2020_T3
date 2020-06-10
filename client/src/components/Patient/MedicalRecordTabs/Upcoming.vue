<template>
  <v-card>
    <v-card-title>Upcoming appointments</v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="getConfirmedAppointments">
        <template v-slot:item.cancel="{ item }">
          <v-btn small icon @click="cancel(item)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data: () => ({
    headers: [
      { text: 'Clinic', value: 'clinic.name' },
      { text: 'Doctor', value: 'doctorFullName' },
      { text: 'Start', value: 'start' },
      { text: 'Appointment type', value: 'priceList.appointmentType.name' },
      { text: 'Price', value: 'priceList.price' },
      { text: 'Cancel', value: 'cancel', sortable: false },
    ],
  }),

  computed: {
    ...mapGetters({
      getConfirmedAppointments:
        'confirmedAppointments/getConfirmedAppointments',
      getUser: 'authentication/getUser',
    }),
  },

  methods: {
    ...mapActions('confirmedAppointments', {
      getUpcomingAppointmentsAction: 'getUpcomingAppointmentsAction',
      cancelConfirmedAppointmentAction: 'cancelConfirmedAppointmentAction',
    }),

    cancel(item) {
      if (confirm('Are you sure you want to cancel this appointment')) {
        this.cancelConfirmedAppointmentAction(item.id);
      }
    },
  },

  created() {
    this.getUpcomingAppointmentsAction(this.getUser.id);
  },
};
</script>

<style></style>
