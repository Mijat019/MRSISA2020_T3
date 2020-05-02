<template>
  <div>
    <FreeAppointmentsTable>
      <template v-slot:top>
        <!-- buttons for top of  -->
      </template>
      <template v-slot:actions>
        <!-- buttons for rows go here -->
      </template>
    </FreeAppointmentsTable>
  </div>
</template>

<script>
import FreeAppointmentsTable from "./FreeAppointmentsTable";
export default {
  name: "ManageFreeAppointments",
  components: {
    FreeAppointmentsTable
  }
};
</script>

<style>
</style>