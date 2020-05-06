<template>
  <div>
    <DrugsDialog />
    <DrugsTable>
      <template v-slot:top>
        <v-btn dark @click="openAddDialog">Add drug</v-btn>
      </template>
      <template v-slot:actions="{drug}">
        <v-icon small @click="openEditDialog(drug)">mdi-pencil</v-icon>
        <v-icon small @click="deleteDrug(drug)">mdi-delete</v-icon>
      </template>
    </DrugsTable>
  </div>
</template>

<script>
import DrugsTable from "./DrugsTable";
import DrugsDialog from "./DrugsDialog";
import { mapMutations } from "vuex";
export default {
  name: "ManageDrugs",
  components: {
    DrugsTable,
    DrugsDialog
  },
  data: () => ({}),

  methods: {
    ...mapMutations("drugsDialog", {
      openAddDialog: "openAddDialog",
      openEditDialog: "openEditDialog"
    }),

    deleteDrug(drug) {
      console.log(drug);
    }
  }
};
</script>

<style>
</style>