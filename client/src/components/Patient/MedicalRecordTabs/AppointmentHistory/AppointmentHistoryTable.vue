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
          <RateDoctors :item="item.confirmedAppointment.doctor.user" />
          <RateClinics :item="item.confirmedAppointment.doctor.clinic" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RateDoctors from './RateDoctors';
import RateClinics from './RateClinics';

export default {
  components: {
    RateDoctors,
    RateClinics,
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Clinic',
          value: 'confirmedAppointment.doctor.clinic.name',
        },
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
        {
          text: 'Actions',
          value: 'actions',
          align: 'center',
          sortable: false,
        },
      ],
    };
  },

  methods: {
    ...mapActions('appointmentReport', {
      getReportsForPatientAction: 'getReportsForPatientAction',
    }),

    rateDoctor(item) {
      console.log(item);
    },

    rateClinic(item) {
      console.log(item);
    },
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
