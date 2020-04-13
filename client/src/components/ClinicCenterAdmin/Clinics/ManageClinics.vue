<template>
  <ClinicsTable>
    <template v-slot:addClinic>
      <AddClinic />
    </template>
    <template v-slot:actions="item">
      <EditDeleteActions :item="item" />
    </template>
  </ClinicsTable>
</template>

<script>
import AddClinic from "./AddClinic";
import ClinicsTable from "./ClinicsTable";
import EditDeleteActions from "./EditDeleteActions";
export default {
  name: "ManageClinics",
  components: {
    AddClinic,
    ClinicsTable,
    EditDeleteActions
  }
};
</script>

<style></style>
