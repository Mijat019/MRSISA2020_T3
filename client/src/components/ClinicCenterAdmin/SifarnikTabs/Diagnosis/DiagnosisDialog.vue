<template>
  <v-dialog max-width="50%" v-model="getShowDialog" @click:outside="closeDialog">
    <v-card>
      <v-card-title v-if="getDialogType === `add`">Add a new diagnosis</v-card-title>
      <v-card-title v-else>Edit this diagnosis</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="getDialogDiagnosis.name" :rules="rules" label="Name" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn v-if="getDialogType === 'add'" color="primary" @click="addDiagnosis">Add</v-btn>
        <v-btn v-else color="primary" @click="updateDiagnosis">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "DiagnosissDialog",

  data: () => ({
    rules: [
      v => !!v || "This field is required",
      v =>
        (v && v.length <= 255) ||
        "This field can't be longer than 255 characters"
    ]
  }),

  methods: {
    ...mapActions("diagnosis", {
      addDiagnosisAction: "addDiagnosisAction",
      updateDiagnosisAction: "updateDiagnosisAction"
    }),
    ...mapMutations("diagnosisDialog", {
      closeDialog: "closeDialog"
    }),

    async addDiagnosis() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.addDiagnosisAction(this.getDialogDiagnosis);
      this.closeDialog();
    },

    async updateDiagnosis() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.updateDiagnosisAction(this.getDialogDiagnosis);
      this.closeDialog();
    }
  },

  computed: {
    ...mapGetters("diagnosisDialog", {
      getShowDialog: "getShowDialog",
      getDialogDiagnosis: "getDialogDiagnosis",
      getDialogType: "getDialogType"
    })
  }
};
</script>

<style>
</style>