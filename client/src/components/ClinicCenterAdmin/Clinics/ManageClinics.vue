<template>
  <ClinicsTable>
    <template v-slot:top>
      <AddClinic />
    </template>
    <template v-slot:actions="item">
      <EditDeleteClinicAction :item="item" />
    </template>
  </ClinicsTable>
</template>

<script>
import AddClinic from "./AddClinic";
import ClinicsTable from "./ClinicsTable";
import EditDeleteClinicAction from "./EditDeleteClinicAction";
export default {
  name: "ManageClinics",
  components: {
    AddClinic,
    ClinicsTable,
    EditDeleteClinicAction
  }
};
</script>

<style></style>
