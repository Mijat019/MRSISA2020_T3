<template>
  <div>
    <DiagnosisDialog />
    <DiagnosisTable>
      <template v-slot:top>
        <v-btn dark @click="openAddDialog">Add diagnosis</v-btn>
      </template>
      <template v-slot:actions="{diagnosis}">
        <v-icon small @click="openEditDialog(diagnosis)">mdi-pencil</v-icon>
        <v-icon small @click="deleteDiagnosis(diagnosis.id)">mdi-delete</v-icon>
      </template>
    </DiagnosisTable>
  </div>
</template>

<script>
import DiagnosisTable from "./DiagnosisTable";
import DiagnosisDialog from "./DiagnosisDialog";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "ManageDiagnosis",
  components: {
    DiagnosisTable,
    DiagnosisDialog
  },
  data: () => ({}),

  methods: {
    ...mapActions("diagnosis", {
      deleteDiagnosisAction: "deleteDiagnosisAction"
    }),

    ...mapMutations("diagnosisDialog", {
      openAddDialog: "openAddDialog",
      openEditDialog: "openEditDialog"
    }),

    async deleteDiagnosis(id) {
      if (confirm("Are you sure that you want to delete this diagnosis?")) {
        await this.deleteDiagnosisAction(id);
      }
    }
  }
};
</script>

<style>
</style>