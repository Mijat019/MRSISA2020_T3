<template>
  <v-card>
    <v-card-title></v-card-title>

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
        Time: {{ dialogAppo.start }}
        <br />
        <v-spacer />
        <v-btn color="primary" @click="makeAppointment()">Make appointment</v-btn>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ScheduleAppointment",
  components: {},
  data() {
    return {
      appoType: null,
      headers: [
        { text: "Start", value: "start" },
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
    ...mapActions("appointmentTypes", {
      getAppointmentTypesAction: "getAppointmentTypesAction"
    }),
    ...mapActions("freeAppointments", {
      getFreeAppointmentsByTypeAction: "getFreeAppointmentsByTypeAction",
      makeAppointmentAction: "makeAppointmentAction"
    }),
    showDialog: function(item) {
      this.dialogAppo = item;
      this.dialog = true;
    },
    makeAppointment: function() {
      this.makeAppointmentAction({
        appoId: this.dialogAppo.id,
        userId: this.getUser.id
      });
      this.dialog = false;
    }
  },

  async mounted() {
    await this.getAppointmentTypesAction();
  },

  computed: {
    ...mapGetters("appointmentTypes", {
      getAppointmentTypes: "getAppointmentTypes"
    }),
    ...mapGetters("freeAppointments", {
      getFreeAppointments: "getFreeAppointments"
    }),
    ...mapGetters("authentication", {
      getUser: "getUser"
    })
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