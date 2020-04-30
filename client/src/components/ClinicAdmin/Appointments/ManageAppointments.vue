<template>
  <div>
    <AppointmentsTable>
      <template v-slot:top>
        <!-- buttons for top of  -->
      </template>
      <template v-slot:actions>
        <!-- buttons for rows go here -->
      </template>
    </AppointmentsTable>
  </div>
</template>

<script>
import AppointmentsTable from "./AppointmentsTable";
export default {
  name: "ManageAppointments",
  components: {
    AppointmentsTable
  }
};
</script>

<style>
</style>