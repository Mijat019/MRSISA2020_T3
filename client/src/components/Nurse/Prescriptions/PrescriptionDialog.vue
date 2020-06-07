<template>
  <v-dialog
    v-if="appointmentReport"
    v-model="value"
    max-width="40%"
    @click:outside="$emit(`input`, false)"
  >
    <v-card>
      <v-card-title>{{ `${appointmentReport.patientMedicalRecord.user.firstName} ${appointmentReport.patientMedicalRecord.user.lastName}` }}</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="appointmentReport.prescriptions"></v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="approve" color="primary">Approve</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'PrescriptionDialog',

  props: ['value', 'appointmentReport'],

  data: () => ({
    headers: [{ text: 'Drug name', value: 'drug.name' }],
  }),

  methods: {
    ...mapActions({
      approvePrescriptions: 'prescriptionApproving/approvePrescriptions',
    }),

    approve() {
      let { prescriptions } = this.appointmentReport;
      prescriptions = prescriptions.map(prescription => prescription.id);

      this.approvePrescriptions({
        appointmentReportId: this.appointmentReport.id,
        prescriptions,
      });
      this.$emit('input', !this.value);
    },
  },
};
</script>

<style>
</style>