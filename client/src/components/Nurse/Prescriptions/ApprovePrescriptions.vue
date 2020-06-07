<template>
  <div>
    <PrescriptionDialog
      v-model="showPrescriptionDialog"
      :appointmentReport="selectedAppointmentReport"
    />
    <v-data-table :headers="headers" :items="getReportsWithPrescriptions">
      <template v-slot:item.actions="{item}">
        <v-btn @click="openPrescriptionDialog(item)" icon>
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import PrescriptionDialog from './PrescriptionDialog.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: { PrescriptionDialog },

  name: 'ApprovePrescriptions',

  data: () => ({
    showPrescriptionDialog: false,
    selectedAppointmentReport: null,
    headers: [
      { text: 'First name', value: 'patientMedicalRecord.user.firstName' },
      { text: 'Last name', value: 'patientMedicalRecord.user.lastName' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),

  computed: {
    ...mapGetters({
      getReportsWithPrescriptions:
        'prescriptionApproving/getReportsWithPrescriptions',
      getUser: 'authentication/getUser',
    }),
  },

  methods: {
    ...mapActions({
      getReportsWithPrescriptionsAction:
        'prescriptionApproving/getReportsWithPrescriptionsAction',
    }),

    openPrescriptionDialog(item) {
      this.showPrescriptionDialog = true;
      this.selectedAppointmentReport = item;
    },
  },

  created() {
    const { clinicId } = this.getUser;
    this.getReportsWithPrescriptionsAction(clinicId);
  },
};
</script>

<style>
</style>