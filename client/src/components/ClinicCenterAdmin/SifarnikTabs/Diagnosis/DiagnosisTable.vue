<template>
  <v-card>
    <v-card-title>Diagnosis</v-card-title>
    <v-card-text>
      <v-data-table :items="getDiagnosis" :headers="headers">
        <template v-slot:top>
          <slot name="top"></slot>
        </template>
        <template v-slot:item.actions="{ item }">
          <slot name="actions" :diagnosis="item"></slot>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DiagnosisTable",

  data: () => ({
    headers: [
      { text: "Diagnosis name", value: "name" },
      { text: "Actions", value: "actions" }
    ]
  }),

  methods: {
    ...mapActions({ getDiagnosisAction: "diagnosis/getDiagnosisAction" })
  },

  computed: {
    ...mapGetters({
      getDiagnosis: "diagnosis/getDiagnosis"
    })
  },

  created() {
    this.getDiagnosisAction();
  }
};
</script>

<style>
</style>