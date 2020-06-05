<template>
  <v-card>
    <v-card-title>
      Patients medical record
      <v-spacer />
      <v-card-actions>
        <v-btn small dark @click="updateMedicalRecord">Update medical record</v-btn>
      </v-card-actions>
    </v-card-title>
    <v-card-text>
      <v-form ref="medicalRecordForm" lazy-validation>
        <v-text-field label="Height" v-model="medicalRecordUpdate.height"></v-text-field>
        <v-text-field label="Weight" v-model="medicalRecordUpdate.weight"></v-text-field>
        <v-text-field label="Blood type" v-model="medicalRecordUpdate.bloodType"></v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UpdateMedicalRecord",

  data: () => ({
    medicalRecordUpdate: {
      userId: null,
      height: null,
      weight: null,
      bloodType: null
    }
  }),

  computed: {
    ...mapGetters("confirmedAppointments/appointmentReport", {
      getNextAppointment: "getNextAppointment"
    })
  },

  methods: {
    ...mapActions({
      updatePatientMedicalRecordAction:
        "confirmedAppointments/appointmentReport/updatePatientMedicalRecordAction"
    }),

    updateMedicalRecord() {
      this.updatePatientMedicalRecordAction(this.medicalRecordUpdate);
    }
  },

  created() {
    const { patient } = this.getNextAppointment;
    this.medicalRecordUpdate.height = patient.height;
    this.medicalRecordUpdate.weight = patient.weight;
    this.medicalRecordUpdate.bloodType = patient.bloodType;
    this.medicalRecordUpdate.userId = patient.user.id;
  }
};
</script>

<style>
</style>