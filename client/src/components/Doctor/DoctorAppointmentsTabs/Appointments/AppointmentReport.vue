<template>
  <div>
    <v-card>
      <v-card-title>
        Appointment report for patient:
        {{
        `${getNextAppointment.patient.user.firstName} ${getNextAppointment.patient.user.lastName}`
        }}
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn @click="setShowComponent(`nextAppointment`)">Cancel</v-btn>
          <RequestAnAppointment />
          <RequestAnOperation />
          <v-btn @click="submitReport" color="success">Submit report</v-btn>
        </v-card-actions>
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
            <UpdateMedicalRecord />
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
import RequestAnOperation from './RequestAnOperation';
import RequestAnAppointment from './RequestAnAppointment.vue';
import Prescriptions from './Prescriptions';
import UpdateMedicalRecord from './UpdateMedicalRecord';
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  name: 'AppointmentReport',

  components: {
    Prescriptions,
    UpdateMedicalRecord,
    RequestAnAppointment,
    RequestAnOperation,
  },

  data: () => ({
    report: {
      notes: '',
      diagnosisId: null,
      confirmedAppointmentId: null,
      patientMedicalRecordId: null,
    },
  }),

  computed: {
    ...mapGetters({
      getUser: 'authentication/getUser',
      getDiagnosis: 'diagnosis/getDiagnosis',
      getPrescriptions: 'prescriptions/getPrescriptions',
      getNextAppointment:
        'confirmedAppointments/appointmentReport/getNextAppointment',
    }),
  },

  methods: {
    ...mapActions({
      getDiagnosisAction: 'diagnosis/getDiagnosisAction',
      submitAppointmentReportAction:
        'confirmedAppointments/appointmentReport/submitAppointmentReportAction',
    }),

    ...mapMutations({
      setPrescriptions: 'prescriptions/setPrescriptions',
      setShowComponent:
        'confirmedAppointments/appointmentReport/setShowComponent',
    }),

    async submitReport() {
      this.report.confirmedAppointmentId = this.getNextAppointment.id;
      this.report.prescriptions = this.getPrescriptions;
      this.report.patientMedicalRecordId = this.getNextAppointment.patient.user.id;
      this.report.clinicId = this.getUser.clinicId;
      await this.submitAppointmentReportAction(this.report);
      this.setPrescriptions([]);
    },
  },

  created() {
    this.getDiagnosisAction();
    this.setPrescriptions([]);
  },
};
</script>

<style></style>
