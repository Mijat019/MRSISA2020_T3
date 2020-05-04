<template>
  <div>
    <FreeAppointmentsTable>
      <template v-slot:top>
        <AddFreeAppointmentDialog />
      </template>
      <template v-slot:actions="item">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </FreeAppointmentsTable>
  </div>
</template>

<script>
import FreeAppointmentsTable from "./FreeAppointmentsTable";
import AddFreeAppointmentDialog from "./AddFreeAppointmentDialog";

export default {
  name: "ManageFreeAppointments",
  components: {
    FreeAppointmentsTable,
    AddFreeAppointmentDialog
  }
};
</script>

<style>
</style>