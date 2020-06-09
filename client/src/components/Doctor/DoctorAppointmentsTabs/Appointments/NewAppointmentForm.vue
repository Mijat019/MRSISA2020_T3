<template>
  <div>
    <v-form lazy-validation ref="form">
      <v-select
        item-text="appoType.name"
        return-object
        label="Appointment type"
        :items="getPriceListsForDoctor"
        v-model="doctorSpecialization"
        :rules="[v => !!v || 'Appointment type is required']"
      ></v-select>
    </v-form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="schedule">Schedule</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'NewAppointmentForm',

  props: ['start'],

  data: () => ({
    doctorSpecialization: null,
  }),

  methods: {
    ...mapActions({
      getPriceListsForDoctorAction: 'priceLists/getPriceListsForDoctorAction',
      requestAppointmentAction:
        'scheduleCustomAppointment/requestAppointmentAction',
    }),

    schedule() {
      if (this.$refs.form.validate()) {
        this.requestAppointmentAction({
          priceListId: this.doctorSpecialization.appoType.priceList[0].id,
          patientMedicalRecordId: this.getNextAppointment.patient.user.id,
          doctorId: this.getUser.id,
          clinicId: this.getUser.clinicId,
          duration: 60,
          start: moment(this.start).unix(),
        });
        this.$emit('appointmentAdded');
      }
    },
  },

  computed: {
    ...mapGetters({
      getPriceListsForDoctor: 'priceLists/getPriceListsForDoctor',
      getUser: 'authentication/getUser',
      getNextAppointment:
        'confirmedAppointments/appointmentReport/getNextAppointment',
    }),
  },

  created() {
    this.getPriceListsForDoctorAction({
      doctorId: this.getUser.id,
      clinicId: this.getUser.clinicId,
    });
  },
};
</script>

<style>
</style>