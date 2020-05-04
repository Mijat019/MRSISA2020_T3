<template>
  <NursesTable>
    <template v-slot:top>
      <AddNurseDialog />
    </template>
    <template v-slot:actions="nurseId">
      <DeleteNurseDialog :nurseId="nurseId" />
    </template>
  </NursesTable>
</template>

<script>
import NursesTable from "./NursesTable";
import DeleteNurseDialog from "./DeleteNurseDialog";
import AddNurseDialog from "./AddNurseDialog";
export default {
  name: "ManageNurses",
  components: {
    NursesTable,
    DeleteNurseDialog,
    AddNurseDialog
  }
};
</script>

<style>
</style>