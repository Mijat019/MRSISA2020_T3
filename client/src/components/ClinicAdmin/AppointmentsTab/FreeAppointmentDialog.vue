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
                placeholder="Select date"
                v-model="appointment.start"
                :minute-step="15"
                auto
              />
            </div>
          </div>
          <v-text-field type="number" label="Duration(in minutes)" v-model="appointment.duration" />
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
            :items="getPriceLists"
            v-model="appointment.priceListId"
            item-text="appointmentType.name"
            item-value="id"
            label="Price list entry"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn v-if="type === 'add'" color="primary" @click="addAppointment">Add</v-btn>
        <v-btn v-else color="primary" @click="updateAppointment">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Datetime } from "vue-datetime";
export default {
  name: "AppointmentDialog",
  components: {
    datetime: Datetime
  },
  data: () => ({
    rules: [v => !!v || "This field is required"]
  }),
  mounted() {
    this.getRoomsAction();
    this.getDoctorsAction();
    this.getPriceListsAction(this.getUser.clinicId);
  },
  methods: {
    ...mapActions({
      addAppointmentAction: "freeAppointments/addFreeAppointmentAction",
      updateAppointmentAction: "freeAppointments/updateFreeAppointmentAction",
      getRoomsAction: "rooms/getRoomsAction",
      getPriceListsAction: "priceLists/getPriceListsAction",
      getDoctorsAction: "doctors/getDoctorsAction"
    }),

    ...mapMutations("freeAppointmentsDialog", {
      close: "closeDialog"
    }),

    async addAppointment() {
      if (!this.$refs.form.validate() || !this.appointment.start) {
        return;
      }

      //convert datetime to unix seconds
      this.appointment.start = moment(this.appointment.start).unix();
      await this.addAppointmentAction(this.appointment);
      this.close();
    },

    async updateAppointment() {
      if (!this.$refs.form.validate() || !this.appointment.start) {
        return;
      }
      await this.updateAppointmentAction(this.appointment);
      this.close();
    }
  },
  computed: {
    ...mapGetters({
      dialog: "freeAppointmentsDialog/getShowDialog",
      appointment: "freeAppointmentsDialog/getDialogAppointment",
      type: "freeAppointmentsDialog/getDialogType",
      getRooms: "rooms/getRooms",
      getDoctors: "doctors/getDoctors",
      getPriceLists: "priceLists/getPriceLists",
      getUser: "authentication/getUser"
    })
  }
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
