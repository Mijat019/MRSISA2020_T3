<template>
  <div>
    <FreeAppointmentsDialog/>
    <FreeAppointmentsTable>
      <template v-slot:top>
        <!-- buttons for top of  -->
        <v-btn @click="showAddDialog" dark>New Appointment</v-btn>
      </template>
      <template v-slot:actions>
        <!-- buttons for rows go here -->
      </template>
    </FreeAppointmentsTable>
  </div>
</template>

<script>
import FreeAppointmentsTable from "./FreeAppointmentsTable";
import FreeAppointmentsDialog from './FreeAppointmentsDialog'
import { mapGetters, mapActions, mapMutations } from "vuex";


export default {
  name: "ManageFreeAppointments",
  components: {
    FreeAppointmentsTable,
    FreeAppointmentsDialog
  },

  data() {
    return {
      search: "",
    };
  },

  methods: {
    ...mapActions("freeAppointments", {
      getFreeAppointmentsAction: "getFreeAppointmentsAction"
    }),

    ...mapMutations("freeAppointments", {
      showAddDialog: "openAddDialog",
      showEditDialog: "openEditDialog"
    })
  },

  async mounted() {
    await this.getFreeAppointmentsAction();
  },

  computed: {
    ...mapGetters("freeAppointments", {
      getFreeAppointments: "getFreeAppointments"
    })
  }
};
</script>

<style>
</style>