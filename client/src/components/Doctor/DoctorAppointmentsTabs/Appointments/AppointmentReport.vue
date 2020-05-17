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
              <v-card-title>Patients medical record</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field label="Height" v-model="appointment.patient.height"></v-text-field>
                  <v-text-field label="Weight" v-model="appointment.patient.weight"></v-text-field>
                  <v-text-field label="Blood type" v-model="appointment.patient.bloodType"></v-text-field>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title>Notes</v-card-title>
              <v-card-text>
                <v-form>
                  <v-textarea label="Notes about the patient"></v-textarea>
                </v-form>
              </v-card-text>
              <v-card-title>Diagnosis</v-card-title>
              <v-card-text>
                <v-select
                  label="Select a diagnosis"
                  :items="getDiagnosis"
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                <h5>DRUGS :D</h5>
              </v-card-title>
              <v-card-text>
                <v-data-table dense>
                  <template v-slot:top>
                    <v-btn dark small>Add a prescription</v-btn>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AppointmentReport",

  props: ["appointment"],

  data: () => ({}),

  computed: {
    ...mapGetters({ getDiagnosis: "diagnosis/getDiagnosis" })
  },

  methods: {
    ...mapActions({
      getDiagnosisAction: "diagnosis/getDiagnosisAction"
    }),
    async submitReport() {
      this.$emit("changeComponent");
    }
  },

  created() {
    this.getDiagnosisAction();
  }
};
</script>

<style>
</style>