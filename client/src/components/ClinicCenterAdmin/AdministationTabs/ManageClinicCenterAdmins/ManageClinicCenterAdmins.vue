<template>
  <ClinicCenterAdminsTable>
    <template v-slot:top>
      <AddClinicCenterAdmin />
    </template>
  </ClinicCenterAdminsTable>
</template>

<script>
import ClinicCenterAdminsTable from "./ClinicCenterAdminsTable";
import AddClinicCenterAdmin from "./AddClinicCenterAdminDialog";
export default {
  name: "ManageClinicCenterAdmins",
  components: {
    ClinicCenterAdminsTable,
    AddClinicCenterAdmin
  }
};
</script>

<style>
</style>