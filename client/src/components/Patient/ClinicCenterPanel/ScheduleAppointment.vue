<template>
  <v-card>
    <ScheduleAppointmentDialog />

    <!-- <v-card-title>
      <v-btn @click="openDialog" dark>Custom Appointment</v-btn>
    </v-card-title> -->

    <v-card-title class="mx-8 mb-12 mt-5">
      Free Appointments
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        prepend-icon="mdi-magnify"
        label="Search"
        class="searchInput"
        single-line
        hide-details
      ></v-text-field>

      <v-select
        class="mx-12 selectInput"
        item-text="name"
        :items="getAppointmentTypes"
        v-model="appoType"
        menu-props="auto"
        label="Appointment type"
        hide-details
        single-line
        return-object
      ></v-select>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :items="getFreeAppointments"
        :headers="headers"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="showDialog(item)"
            >mdi-check-bold</v-icon
          >
        </template>
        <template #item.doctor="{ item }"
          >{{ item.doctor.user.firstName }}
          {{ item.doctor.user.lastName }}</template
        >
        <template #item.start="{ item }">
          {{ format(item.start) }}
          <!-- {{func(item)}} -->
        </template>
      </v-data-table>
    </v-card-text>

    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-text>
          <ConfirmFreeAppointment
            :appoType="dialogAppo.priceList.appointmentType.name"
            :doctor="
              dialogAppo.doctor.user.firstName +
                ' ' +
                dialogAppo.doctor.user.lastName
            "
            :room="dialogAppo.room.name"
            :time="appointmentTime"
            :date="appointmentDate"
            :price="dialogAppo.priceList.price"
          />
        </v-card-text>
        <v-card-actions class="mx-10">
          <v-spacer></v-spacer>
          <v-btn
            class="blue white--text px-5 text-none"
            rounded
            x-large
            @click="makeAppointment()"
            >Make appointment</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import ScheduleAppointmentDialog from './ScheduleAppointmentDialog';
import ConfirmFreeAppointment from './ConfirmFreeAppointment';

export default {
  name: 'ScheduleAppointment',
  components: {
    ScheduleAppointmentDialog,
    ConfirmFreeAppointment,
  },
  data() {
    return {
      appoKind: null, // custom or predefined
      appoType: null,
      search: '',
      headers: [
        { text: 'Appointment type', value: 'priceList.appointmentType.name' },
        { text: 'Doctor', value: 'doctor', align: 'center' },
        { text: 'Room', value: 'room.name' },
        { text: 'Scheduled Time', value: 'start', align: 'center' },
        { text: 'Duration', value: 'duration' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dialog: false,
      dialogAppo: {
        priceList: {
          appointmentType: {
            name: '',
          },
        },
        doctor: {
          user: {
            firstName: '',
            lastName: '',
          },
        },
        room: {
          name: '',
        },
        start: '',
      },
    };
  },

  methods: {
    format(item) {
      if (!item) return '';

      return moment.unix(item).format('YYYY-MM-DD HH:mm');
    },
    ...mapActions({
      getAppointmentTypesAction: 'appointmentTypes/getAppointmentTypesAction',
      getFreeAppointmentsByTypeAction:
        'freeAppointments/getFreeAppointmentsByTypeAction',
      makeAppointmentAction: 'freeAppointments/makeAppointmentAction',
    }),
    ...mapMutations({
      openDialog: 'scheduleCustomAppointmentDialog/openDialog',
      setAppointments: 'freeAppointments/setAppointments',
    }),
    showDialog: function(item) {
      this.dialogAppo = item;
      this.dialog = true;
    },
    makeAppointment: function() {
      this.makeAppointmentAction({
        appoId: this.dialogAppo.id,
        patientId: this.getUser.id,
      });
      this.dialog = false;
    },
  },

  async mounted() {
    await this.setAppointments([]);
    await this.getAppointmentTypesAction();
  },

  computed: {
    ...mapGetters({
      getAppointmentTypes: 'appointmentTypes/getAppointmentTypes',
      getFreeAppointments: 'freeAppointments/getFreeAppointments',
      getUser: 'authentication/getUser',
    }),

    appointmentTime() {
      const start = moment.unix(this.dialogAppo.start).format('HH:mm');
      return start;
    },

    appointmentDate() {
      const start = moment.unix(this.dialogAppo.start).format('YYYY-MM-DD');
      return start;
    },
  },

  watch: {
    appoType(value) {
      this.getFreeAppointmentsByTypeAction(value.id);
    },
  },
};
</script>

<style></style>
