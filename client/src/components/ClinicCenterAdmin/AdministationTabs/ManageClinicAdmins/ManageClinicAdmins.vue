<template>
  <ClinicAdminTable>
    <template v-slot:addClinicAdmin>
      <AddClinicAdmin />
    </template>
  </ClinicAdminTable>
</template>

<script>
import ClinicAdminTable from "./ClinicAdminsTable";
import AddClinicAdmin from "./AddClinicAdmin";
export default {
  name: "ManageClinicAdmins",
  components: {
    ClinicAdminTable,
    AddClinicAdmin
  },
  data: () => ({})
};
</script>

<style>
</style>