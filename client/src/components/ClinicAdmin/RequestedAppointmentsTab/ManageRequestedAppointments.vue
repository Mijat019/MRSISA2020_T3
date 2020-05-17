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
          <!-- Approve Dialog -->
          <v-dialog v-model="dialogApprove" width="50%" @click:outside="cancel">
            <template v-slot:activator="{ on }">
              <v-btn class="mx-2" v-on="on" color="success" small>approve</v-btn>
            </template>
            <v-card>
              <v-card-title>Select a room for the appointment</v-card-title>
              <v-card-text>
                <v-select
                  :items="getRooms"
                  v-model="room"
                  item-text="name"
                  item-value="id"
                  label="Room"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancel">Cancel</v-btn>
                <v-btn @click="approve(item)" color="success">Approve</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Reject Dialog -->
          <v-dialog v-model="dialogReject" width="50%" @click:outside="cancel">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="error" small>reject</v-btn>
            </template>
            <v-card>
              <v-card-title>What is the reason of rejection?</v-card-title>
              <v-card-text>
                <v-textarea hint="Reason" v-model="reason"></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
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
    dialogReject: false,
    dialogApprove: false,
    room : null,
    reason: "",
    search: "",
    headers: [
      { text: "Patient", value: "patientMedicalRecord.user.firstName" },
      { text: "Doctor", value: "doctor.user.firstName" },
      { text: "Appointment type", value: "priceList.appointmentType.name" },
      { text: "Time", value: "start" },
      { text: "Price", value: "priceList.price" },
      { text: "Actions", value: "actions", sortable: false, align: "center" }
    ]
  }),

  methods: {
    ...mapActions("scheduleCustomAppointment", {
      getAllForClinicAction: "getAllForClinicAction",
      confirmRequestAction: "confirmRequestAction",
      rejectRequestAction: "rejectRequestAction"
    }),

    approve(item) {
      if(!this.room) return;

      item.roomId = this.room;
      this.confirmRequestAction(item);
      this.cancel();
    },

    reject(item) {
      item.reason = this.reason;
      this.rejectRequestAction(item);
      this.cancel();
    },

    cancel() {
      this.reason = "";
      this.dialogReject = false;
      this.room = null;
      this.dialogApprove = false;
    }
  },
  async created() {
    await this.getAllForClinicAction(this.user.clinicId);
  },

  computed: {
    ...mapGetters({
      appointments: "scheduleCustomAppointment/getAppointmentRequests",
      user : "authentication/getUser",
      getRooms: "rooms/getRooms",
    })
  }
};
</script>

<style>
</style>