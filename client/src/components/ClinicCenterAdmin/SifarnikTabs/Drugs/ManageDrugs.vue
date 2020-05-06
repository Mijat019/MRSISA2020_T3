<template>
  <div>
    <DrugsDialog />
    <DrugsTable>
      <template v-slot:top>
        <v-btn dark @click="openAddDialog">Add drug</v-btn>
      </template>
      <template v-slot:actions="{drug}">
        <v-icon small @click="openEditDialog(drug)">mdi-pencil</v-icon>
        <v-icon small @click="deleteDrug(drug.id)">mdi-delete</v-icon>
      </template>
    </DrugsTable>
  </div>
</template>

<script>
import DrugsTable from "./DrugsTable";
import DrugsDialog from "./DrugsDialog";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "ManageDrugs",
  components: {
    DrugsTable,
    DrugsDialog
  },
  data: () => ({}),

  methods: {
    ...mapActions("drugs", { deleteDrugAction: "deleteDrugAction" }),

    ...mapMutations("drugsDialog", {
      openAddDialog: "openAddDialog",
      openEditDialog: "openEditDialog"
    }),

    async deleteDrug(id) {
      if (confirm("Are you sure that you want to delete this drug?")) {
        await this.deleteDrugAction(id);
      }
    }
  }
};
</script>

<style>
</style>