<template>
  <DoctorsTable>
    <template v-slot:top>
      <AddDoctorDialog />
    </template>

    <template v-slot:actions="doctorId">
      <DeleteDoctorDialog :doctorId="doctorId" />
    </template>
  </DoctorsTable>
</template>

<script>
import AddDoctorDialog from "./AddDoctorDialog";
import DoctorsTable from "./DoctorsTable";
import DeleteDoctorDialog from "./DeleteDoctorDialog";
export default {
  name: "ManageDoctors",
  components: {
    AddDoctorDialog,
    DoctorsTable,
    DeleteDoctorDialog
  }
};
</script>

<style>
</style>