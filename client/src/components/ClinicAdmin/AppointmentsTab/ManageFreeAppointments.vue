<template>
  <div>
    <FreeAppointmentsDialog />
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
import FreeAppointmentsTable from './FreeAppointmentsTable';
import FreeAppointmentsDialog from './FreeAppointmentDialog';
import { mapActions, mapMutations } from 'vuex';
import moment from 'moment'

export default {
  name: 'ManageFreeAppointments',
  components: {
    FreeAppointmentsTable,
    FreeAppointmentsDialog,
  },
  methods: {
    ...mapActions('freeAppointments', {
      deleteAppointmentAction: 'deleteFreeAppointmentAction',
    }),
    ...mapMutations('freeAppointmentsDialog', {
      showAddDialog: 'openAddDialog',
      showEditDialog: 'openEditDialog',
    }),

    editItem({ appointment }) {
      this.showEditDialog({
        id: appointment.id,
        start: moment.unix(appointment.start).toISOString(),
        duration: appointment.duration,
        roomId: appointment.roomId,
        appointmentTypeId: appointment.priceList.appointmentTypeId,
        doctorId: appointment.doctor.userId,
        version: appointment.version,
      });
    },

    async deleteItem({ appointment }) {
      if (confirm('Are you sure you want to delete this item?')) {
        await this.deleteAppointmentAction(appointment.id);
      }
    },
  },
};
</script>

<style></style>
