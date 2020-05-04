<template>
  <div>
    <FreeAppointmentsDialog/>
    <FreeAppointmentsTable>
      <template v-slot:top>
        <!-- buttons for top of  -->
        <v-btn @click="showAddDialog" dark>New Appointment</v-btn>
      </template>
      <template v-slot:actions="item">
        <!-- buttons for rows go here -->
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
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
      getFreeAppointmentsAction: "getFreeAppointmentsAction",
      deleteAppointmentAction: "deleteFreeAppointmentAction",
    }),

    ...mapMutations("freeAppointments", {
      showAddDialog: "openAddDialog",
      showEditDialog: "openEditDialog"
    }),

    editItem(item) {
      this.showEditDialog(item.appointment);
    },

    async deleteItem(item) {
      if(confirm('Are you sure you want to delete this item?')){
        await this.deleteAppointmentAction(item.appointment);
      }
    },
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