<template>
  <ClinicsTable>
    <template v-slot:top>
      <AddClinic />
    </template>
  </ClinicsTable>
</template>

<script>
import AddClinic from './AddClinic';
import ClinicsTable from './ClinicsTable';
export default {
  name: 'ManageClinics',
  components: {
    AddClinic,
    ClinicsTable,
  },
};
</script>

<style></style>
