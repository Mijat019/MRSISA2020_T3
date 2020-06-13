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
        :key="componentKey"
        :search="search"
      >
        <template #item.doctorFullName="{item}">
          {{ item.confirmedAppointment.doctor.user.firstName }}
          {{ item.confirmedAppointment.doctor.user.lastName }}
        </template>
        <template #item.start="{item}">
          {{ format(item.confirmedAppointment.start) }}
        </template>
        <template v-slot:top>
          <slot name="top"></slot>
        </template>

        <template v-slot:item.actions="{ item }">
          <RateDoctors
            :disableBtn="isDoctorRated(item)"
            :item="item.confirmedAppointment.doctor.user"
          />
          <RateClinics
            :disableBtn="isClinicRated(item)"
            :item="item.confirmedAppointment.doctor.clinic"
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import RateDoctors from './RateDoctors';
import RateClinics from './RateClinics';
import { bus } from '@/main';

export default {
  components: {
    RateDoctors,
    RateClinics,
  },
  data() {
    return {
      search: '',
      componentKey: 0,
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
          value: 'start',
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
    ...mapActions({
      getReportsForPatientAction:
        'appointmentReport/getReportsForPatientAction',
      getAlreadyRatedAction: 'ratings/getAlreadyRatedAction',
    }),

    rateDoctor(item) {
      console.log(item);
    },

    rateClinic(item) {
      console.log(item);
    },

    format(item) {
      if (!item) return '';
      return moment.unix(item).format('YYYY-MM-DD HH:mm');
    },

    isDoctorRated(item) {
      console.log("IZVRSSSION")
      if (!this.getAlreadyRated.doctors) return false;

      const id = item.confirmedAppointment.doctorId;
      return (
        this.getAlreadyRated.doctors.filter(rated => rated.doctorId == id)
          .length > 0
      );
    },

    isClinicRated(item) {
      if (!this.getAlreadyRated.clinics) return false;
      const id = item.confirmedAppointment.clinicId;
      return (
        this.getAlreadyRated.clinics.filter(rated => rated.clinicId == id)
          .length > 0
      );
    },

    forceRerender() {
      this.componentKey += 1;
    },
  },

  async created() {
    await this.getAlreadyRatedAction(this.user.id);
    await this.getReportsForPatientAction(this.user.id);

    bus.$on('ratingChanged', () => {
      console.log("WWWWWWWWWWWWWWWWWWWWWWWWAT");
      this.forceRerender();
    });
  },

  computed: {
    ...mapGetters({
      getPatientReports: 'appointmentReport/getPatientReports',
      user: 'authentication/getUser',
      getAlreadyRated: 'ratings/getAlreadyRated',
    }),
  },
};
</script>

<style></style>
