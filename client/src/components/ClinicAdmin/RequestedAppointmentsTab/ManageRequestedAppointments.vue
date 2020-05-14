<template>
  <v-card>
    <v-card-title>
      Appointment Requests
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="appointments" :search="search">
      <template v-slot:item.actions="{item}">
        <div>
          <v-btn @click="approve(item)" color="success" small>Approve</v-btn>
          {{" "}}
          <v-dialog v-model="dialog">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="error" small>reject</v-btn>
            </template>
            <v-card>
              <v-card-title>Why are you rejecting?</v-card-title>
              <v-card-text>
                <v-textarea hint="Reason" v-model="reason"></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="cancel">Cancel</v-btn>
                <v-btn @click="reject(item)" color="error">Reject</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {

  data: () => ({
    dialog: false,
    reason: "",
    search: "",
    headers: [
      { text: "Patient", value: "patient.firstName" },
      { text: "Doctor", value: "doctor.user.firstName" },
      { text: "Appointment type", value: "priceList.appointmentType.name" },
      { text: "Time", value: "start" },
      { text: "Price", value: "priceList.price" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),

  methods: {
    ...mapActions("scheduleCustomAppointment", {
      getAllForClinicAction: "getAllForClinicAction",
      confirmRequestAction: "confirmRequestAction",
      rejectRequestAction: "rejectRequestAction"
    }),

    approve(item) {
      this.confirmRequestAction(item);
    },

    reject(item) {
      this.rejectRequestAction({
        requestPayload: item,
        reason: this.reason
      });
      this.reason = "";
    },

    cancel() {
      this.reason = "";
      this.dialog = false;
    }
  },
  async created() {
    await this.getAllForClinicAction(this.user.clinicId);
    console.log(this.appointments);
  },

  computed: {
    ...mapGetters({
      appointments: "scheduleCustomAppointment/getAppointmentRequests",
      user : "authentication/getUser"
    })
  }
};
</script>

<style>
</style>