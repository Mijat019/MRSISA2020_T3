<template>
  <div>
    <v-card>
      <v-card-title>
        Appointment report
        <v-spacer></v-spacer>
        <v-btn @click="submitReport" color="primary">Submit report</v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Notes</v-card-title>
              <v-card-text>
                <v-form>
                  <v-textarea label="Notes about the patient" v-model="report.notes"></v-textarea>
                </v-form>
              </v-card-text>
              <v-card-title>Diagnosis</v-card-title>
              <v-card-text>
                <v-select
                  label="Select a diagnosis"
                  :items="getDiagnosis"
                  item-text="name"
                  item-value="id"
                  v-model="report.diagnosisId"
                ></v-select>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Patients medical record</v-card-title>
              <v-card-text>
                <v-form ref="medicalRecordForm" lazy-validation>
                  <v-text-field
                    label="Height"
                    :value="appointment.patient.height"
                    v-model="medicalRecord.height"
                  ></v-text-field>
                  <v-text-field
                    label="Weight"
                    :value="appointment.patient.weight"
                    v-model="medicalRecord.weight"
                  ></v-text-field>
                  <v-text-field
                    label="Blood type"
                    :value="appointment.patient.bloodType"
                    v-model="medicalRecord.bloodType"
                  ></v-text-field>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <Prescriptions />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Prescriptions from "./Prescriptions";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "AppointmentReport",

  components: {
    Prescriptions
  },

  props: ["appointment"],

  data: () => ({
    report: {
      notes: "",
      diagnosisId: null,
      confirmedAppointmentId: null,
      patientMedicalRecordId: null
    },

    medicalRecord: {
      height: null,
      weight: null,
      bloodType: null
    }
  }),

  computed: {
    ...mapGetters({
      getDiagnosis: "diagnosis/getDiagnosis",
      getPrescriptions: "prescriptions/getPrescriptions"
    })
  },

  methods: {
    ...mapActions({
      getDiagnosisAction: "diagnosis/getDiagnosisAction",
      submitAppointmentReportAction:
        "appointmentReport/submitAppointmentReportAction"
    }),

    ...mapMutations({
      setPrescriptions: "prescriptions/setPrescriptions",
      removeNextUnfinishedConfirmedAppointment:
        "confirmedAppointments/removeNextUnfinishedConfirmedAppointment"
    }),

    async submitReport() {
      this.report.confirmedAppointmentId = this.appointment.id;
      this.report.prescriptions = this.getPrescriptions;
      this.report.patientMedicalRecordId = this.appointment.patient.user.id;
      await this.submitAppointmentReportAction(this.report);
      this.setPrescriptions([]);
      this.$emit("submited");
    }
  },

  created() {
    this.getDiagnosisAction();
  }
};
</script>

<style>
</style>