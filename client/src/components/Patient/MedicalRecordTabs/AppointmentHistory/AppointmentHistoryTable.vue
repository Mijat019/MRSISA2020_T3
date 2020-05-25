<template>
  <v-card>
    <v-card-title>
      Appointment History
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="getPatientReports"
        :search="search"
      >
        <template #item.doctorFullName="{item}">
          {{ item.confirmedAppointment.doctor.user.firstName }}
          {{ item.confirmedAppointment.doctor.user.lastName }}
        </template>
        <template v-slot:top>
          <slot name="top"></slot>
        </template>

        <template v-slot:item.actions="{ item }">
          <slot name="actions" :item="item"></slot>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Doctor',
          value: 'doctorFullName',
        },
        {
          text: 'Appointment Type',
          value: 'confirmedAppointment.priceList.appointmentType.name',
        },
        {
          text: 'Diagnosis',
          value: 'diagnosis.name',
        },
        {
          text: 'Notes',
          value: 'notes',
        },
        {
          text: 'Date',
          value: 'confirmedAppointment.start',
        },
      ],
    };
  },

  methods: {
    ...mapActions('appointmentReport', {
      getReportsForPatientAction: 'getReportsForPatientAction',
    }),
  },

  async mounted() {
    await this.getReportsForPatientAction(this.user.id);
  },

  computed: {
    ...mapGetters({
      getPatientReports: 'appointmentReport/getPatientReports',
      user: 'authentication/getUser',
    }),
  },
};
</script>

<style></style>
