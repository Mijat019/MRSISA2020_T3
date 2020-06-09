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
        @click:row="rowClicked"
      >
        <template #item.doctor="{ item }"
          >{{ item.doctor.user.firstName }}
          {{ item.doctor.user.lastName }}</template
        >
        <template #item.clinic="{ item }">
          {{ item.priceList.clinic.name }}
        </template>
        <template #item.start="{ item }">
          {{ format(item.start) }}
        </template>
      </v-data-table>
    </v-card-text>

    <v-dialog v-model="dialog" width="600">
      <v-card class="pa-3">
        <v-card-text>
          <ConfirmFreeAppointment
            :appoType="dialogAppo.priceList.appointmentType.name"
            :doctor="getFullName"
            :room="dialogAppo.room.name"
            :time="appointmentTime"
            :date="appointmentDate"
            :price="dialogAppo.priceList.price"
            :clinic="clinicName"
          />
        </v-card-text>
        <v-card-actions class="mx-8">
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
        {
          text: 'Appointment type',
          value: 'priceList.appointmentType.name',
          align: 'center',
        },
        { text: 'Clinic', value: 'clinic', align: 'center' },
        { text: 'Doctor', value: 'doctor', align: 'center' },
        { text: 'Room', value: 'room.name', align: 'center' },
        { text: 'Scheduled Time', value: 'start', align: 'center' },
        { text: 'Price', value: 'priceList.price', align: 'center' },
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
    format(item) {
      if (!item) return '';

      return moment.unix(item).format('YYYY-MM-DD HH:mm');
    },
    rowClicked(value) {
      console.log(value);
      this.showDialog(value);
    },
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

    getFullName() {
      return (
        this.dialogAppo.doctor.user.firstName +
        ' ' +
        this.dialogAppo.doctor.user.lastName
      );
    },

    clinicName() {
      if(this.dialogAppo.priceList.clinic) return this.dialogAppo.priceList.clinic.name;
      return '';
    }
  },

  watch: {
    appoType(value) {
      this.getFreeAppointmentsByTypeAction(value.id);
    },
  },
};
</script>

<style></style>
