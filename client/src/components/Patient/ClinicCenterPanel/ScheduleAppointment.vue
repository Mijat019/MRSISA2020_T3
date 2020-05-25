<template>
  <v-card>
    <ScheduleAppointmentDialog />

    <v-card-title>
      <v-btn @click="openDialog" dark>Custom Appointment</v-btn>
    </v-card-title>

    <v-card-title>
      <v-autocomplete
        v-model="appoType"
        :items="getAppointmentTypes"
        item-text="name"
        label="Appointment Type"
        placeholder="Enter appointment type"
        return-object
      ></v-autocomplete>
    </v-card-title>

    <v-card-text v-if="appoType != null">
      <v-data-table :items="getFreeAppointments" :headers="headers">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="showDialog(item)">mdi-check-bold</v-icon>
        </template>
      </v-data-table>
    </v-card-text>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        Appointment type: {{ dialogAppo.priceList.appointmentType.name }}
        <br />
        Doctor: {{ dialogAppo.doctor.user.firstName }} {{ dialogAppo.doctor.user.lastName }}
        <br />
        Room: {{ dialogAppo.room.name }}
        <br />
        Time: {{ appointmentTime }}
        <br />
        <v-spacer />
        <v-btn color="primary" @click="makeAppointment()">Make appointment</v-btn>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions, mapMutations } from "vuex";
import ScheduleAppointmentDialog from "./ScheduleAppointmentDialog";

export default {
  name: "ScheduleAppointment",
  components: {
    ScheduleAppointmentDialog
  },
  data() {
    return {
      appoKind: null, // custom or predefined
      appoType: null,
      headers: [
        {
          text: "Start",
          value: "start"
        },
        { text: "Room", value: "room.name" },
        { text: "Doctors first name", value: "doctor.user.firstName" },
        { text: "Doctors last name", value: "doctor.user.lastName" },
        { text: "Appointment type", value: "priceList.appointmentType.name" },
        { text: "Duration", value: "duration" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      dialog: false,
      dialogAppo: {
        priceList: {
          appointmentType: {
            name: ""
          }
        },
        doctor: {
          user: {
            firstName: "",
            lastName: ""
          }
        },
        room: {
          name: ""
        },
        start: ""
      }
    };
  },

  methods: {
    ...mapActions({
      getAppointmentTypesAction: "appointmentTypes/getAppointmentTypesAction",
      getFreeAppointmentsByTypeAction:
        "freeAppointments/getFreeAppointmentsByTypeAction",
      makeAppointmentAction: "freeAppointments/makeAppointmentAction"
    }),
    ...mapMutations("scheduleCustomAppointmentDialog", {
      openDialog: "openDialog"
    }),
    showDialog: function(item) {
      this.dialogAppo = item;
      this.dialog = true;
    },
    makeAppointment: function() {
      this.makeAppointmentAction({
        appoId: this.dialogAppo.id,
        patientId: this.getUser.id
      });
      this.dialog = false;
    }
  },

  async mounted() {
    await this.getAppointmentTypesAction();
  },

  computed: {
    ...mapGetters({
      getAppointmentTypes: "appointmentTypes/getAppointmentTypes",
      getFreeAppointments: "freeAppointments/getFreeAppointments",
      getUser: "authentication/getUser",
    }),

    appointmentTime() {
      const start = moment
        .unix(this.dialogAppo.start)
        .format("YYYY-MM-DD HH:mm");
      return start;
    }
  },

  watch: {
    appoType(value) {
      this.getFreeAppointmentsByTypeAction(value.id);
    }
  }
};
</script>

<style>
</style>