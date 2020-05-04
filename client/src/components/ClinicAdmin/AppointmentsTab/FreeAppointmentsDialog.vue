<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
    <v-card>
      <v-card-title v-if="type === 'add'">Add New Appointment</v-card-title>
      <v-card-title v-else>Edit Appointment</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <div>
          <div class="example-inputs my-5">
            <!-- value-zone="Europe/Belgrade" zone="Europe/Belgrade" -->
            <datetime type="datetime" zone="UTC" placeholder="Select date" v-model="appointment.start" :minute-step="15" auto />
          </div>
          <!-- <p>
            <strong>Value:</strong> {{ appointment.start }}
          </p> -->
          </div>
          <v-text-field type="number" label="Duration(in minutes)" v-model="appointment.duration"/>
          <v-select :items="getRooms" v-model="appointment.room" item-text="name" label="Room" return-object/>
          <v-select :items="getDoctors" v-model="appointment.doctor" item-text="fullName" label="Doctor" return-object/>
          <v-select :items="getAppointmentTypes" v-model="appointment.appointmentType" item-text="name" label="Appointment Type" return-object/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="type === 'edit'" color="red" @click="deleteAppointment">Delete</v-btn>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn v-if="type === 'add'" color="primary" @click="addAppointment">Add</v-btn>
        <v-btn v-else color="primary" @click="updateAppointment">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Datetime } from 'vue-datetime';


export default {
  name: "AppointmentDialog",
    components: {
    datetime: Datetime
  },
  data: () => ({
    rules: [
      v => !!v || "This field is required",
    ],
    addressList: [],
    date: '',
    isLoading: false
  }),

  mounted() {
    this.getRoomsAction();
    this.getDoctorsAction();
    this.getAppointmentTypesAction();
  },

  methods: {
    ...mapActions({
      addAppointmentAction: "freeAppointments/addFreeAppointmentAction",
      deleteAppointmentAction: "freeAppointments/deleteFreeAppointmentAction",
      updateAppointmentAction: "freeAppointments/updateFreeAppointmentAction",
      getRoomsAction : "rooms/getRoomsAction",
      getAppointmentTypesAction : "appointmentTypes/getAppointmentTypesAction",
      getDoctorsAction : "doctors/getDoctorsAction"
    }),

    ...mapMutations("freeAppointments", {
      close: "closeDialog"
    }),

    async addAppointment() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.addAppointmentAction(this.appointment);
      this.close();
    },

    async deleteAppointment() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.deleteAppointmentAction(this.appointment);
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
      dialog: "freeAppointments/getShowDialog",
      appointment: "freeAppointments/getDialogAppointment",
      type: "freeAppointments/getDialogType",
      getRooms: "rooms/getRooms",
      getDoctors: "doctors/getDoctors",
      getAppointmentTypes : "appointmentTypes/getAppointmentTypes"
    }),

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
