<template>
  <v-card>
    <v-card-title>Free appointments</v-card-title>
    <v-card-title>
      <v-select
        :items="getDoctors"
        item-text="fullName"
        v-model="doctor"
        label="Select a doctor"
        return-object
      ></v-select>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="getFreeAppointments"
        :search="search"
      >
        <template v-slot:top>
          <slot name="top"></slot>
        </template>
        <template v-slot:item.actions="{ item }">
          <slot name="actions" :appointment="item"></slot>
        </template>
        <template #item.doctor="{ item }"
          >{{ item.doctor.user.firstName }}
          {{ item.doctor.user.lastName }}</template
        >
        <template #item.start="{ item }">
          {{ format(item.start) }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import moment from 'moment';

export default {
  name: 'FreeAppointmentsTable',
  data: () => ({
    search: '',
    headers: [
      { text: 'Appointment type', value: 'priceList.appointmentType.name',align: 'center' },
      { text: 'Doctor', value: 'doctor', align: 'center' },
      { text: 'Room', value: 'room.name', align: 'center' },
      { text: 'Scheduled time', value: 'start', align: 'center' },
      { text: 'Duration', value: 'duration', align: 'center' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    doctor: null,
  }),

  methods: {
    ...mapActions({
      getDoctorsAction: 'doctors/getDoctorsAction',
      getFreeAppointmentsAction: 'freeAppointments/getFreeAppointmentsAction',
    }),

    ...mapMutations('freeAppointments', {
      setAppointments: 'setAppointments',
    }),

    format(item) {
      if (!item) return '';

      return moment.unix(item).format('YYYY-MM-DD HH:mm');
    },
  },

  async mounted() {
    this.setAppointments([]);
    await this.getDoctorsAction();
  },

  computed: {
    ...mapGetters({
      getDoctors: 'doctors/getDoctors',
      getFreeAppointments: 'freeAppointments/getFreeAppointments',
    }),
  },

  watch: {
    doctor(value) {
      this.getFreeAppointmentsAction(value.userId);
    },
  },
};
</script>

<style></style>
