<template>
  <DoctorsTable>
    <template v-slot:top>
      <AddDoctorDialog />
    </template>

    <template v-slot:actions="{ doctorId, spec }">
      <DoctorSpecDialog :doctorId="doctorId" :spec="spec"/>
      <DeleteDoctorDialog :doctorId="doctorId"/>
    </template>
  </DoctorsTable>
</template>

<script>
import AddDoctorDialog from "./AddDoctorDialog";
import DoctorsTable from "./DoctorsTable";
import DeleteDoctorDialog from "./DeleteDoctorDialog";
import DoctorSpecDialog from "./DoctorSpecDialog";
export default {
  name: "ManageDoctors",
  components: {
    AddDoctorDialog,
    DoctorsTable,
    DeleteDoctorDialog,
    DoctorSpecDialog
  }
};
</script>

<style>
</style>