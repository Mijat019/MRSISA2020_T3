<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
    <v-card>
      <v-card-title v-if="type === 'add'">Add New Appointment</v-card-title>
      <v-card-title v-else>Edit Appointment</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <div>
            <div class="example-inputs my-5">
              <datetime
                type="datetime"
                zone="UTC"
                placeholder="Select date"
                v-model="appointment.start"
                :minute-step="15"
                auto
              />
            </div>
          </div>
          <v-text-field
            type="number"
            label="Duration(in minutes)"
            v-model="appointment.duration"
          />
          <v-select
            :items="getRooms"
            v-model="appointment.roomId"
            item-text="name"
            item-value="id"
            label="Room"
          />
          <v-select
            :items="getDoctors"
            v-model="appointment.doctorId"
            item-text="fullName"
            item-value="userId"
            label="Doctor"
          />
          <v-select
            :items="getAppointmentTypes"
            v-model="appointment.appointmentTypeId"
            item-text="name"
            item-value="id"
            label="Appointment Type"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="type === 'add'" color="primary" @click="addAppointment"
          >Add</v-btn
        >
        <v-btn v-else color="primary" @click="updateAppointment">Save</v-btn>
        <v-btn @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Datetime } from "vue-datetime";
export default {
  name: "AppointmentDialog",
  components: {
    datetime: Datetime,
  },
  data: () => ({
    rules: [(v) => !!v || "This field is required"],
  }),
  mounted() {
    this.getRoomsAction();
    this.getDoctorsAction();
    this.getAppointmentTypesAction();
  },
  methods: {
    ...mapActions({
      addAppointmentAction: "freeAppointments/addFreeAppointmentAction",
      updateAppointmentAction: "freeAppointments/updateFreeAppointmentAction",
      getRoomsAction: "rooms/getRoomsAction",
      getAppointmentTypesAction: "appointmentTypes/getAppointmentTypesAction",
      getDoctorsAction: "doctors/getDoctorsAction",
    }),
    ...mapMutations("freeAppointmentsDialog", {
      close: "closeDialog",
    }),
    async addAppointment() {
      if (!this.$refs.form.validate()) {
        return;
      }
      await this.addAppointmentAction(this.appointment);
      this.close();
    },
    async updateAppointment() {
      if (!this.$refs.form.validate()) {
        return;
      }
      await this.updateAppointmentAction(this.appointment);
      this.close();
    },
  },
  computed: {
    ...mapGetters({
      dialog: "freeAppointmentsDialog/getShowDialog",
      appointment: "freeAppointmentsDialog/getDialogAppointment",
      type: "freeAppointmentsDialog/getDialogType",
      getRooms: "rooms/getRooms",
      getDoctors: "doctors/getDoctors",
      getAppointmentTypes: "appointmentTypes/getAppointmentTypes",
    }),
  },
};
</script>

<style>
.example-inputs input {
  padding: 8px 10px;
  font-size: 16px;
  border: solid 1px #ddd;
  color: #444;
  width: 100%;
}
</style>
