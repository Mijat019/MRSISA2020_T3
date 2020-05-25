<template>
  <div>
    <v-form lazy-validation ref="form">
      <v-select
        item-text="name"
        item-value="id"
        label="Room"
        :items="getRooms"
        v-model="roomId"
        :rules="[v => !!v || 'Room is required']"
      ></v-select>
      <v-select
        item-text="appoType.name"
        return-object
        label="Appointment type"
        :items="getPriceListsForDoctor"
        v-model="doctorSpecialization"
        :rules="[v => !!v || 'Appointment type is required']"
      ></v-select>
    </v-form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="schedule">Schedule</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NewAppointmentForm",

  props: ["start"],

  data: () => ({
    roomId: null,
    doctorSpecialization: null
  }),

  methods: {
    ...mapActions({
      getRoomsAction: "rooms/getRoomsAction",
      getPriceListsForDoctorAction: "priceLists/getPriceListsForDoctorAction",
      addConfirmedAppointmentAction:
        "confirmedAppointments/addConfirmedAppointmentAction"
    }),

    schedule() {
      if (this.$refs.form.validate()) {
        this.addConfirmedAppointmentAction({
          roomId: this.roomId,
          priceListId: this.doctorSpecialization.appoType.priceList[0].id,
          patientId: this.getNextAppointment.patient.user.id,
          doctorId: this.getUser.id,
          duration: 60,
          start: moment(this.start).unix()
        });
      }
    }
  },

  computed: {
    ...mapGetters({
      getPriceListsForDoctor: "priceLists/getPriceListsForDoctor",
      getRooms: "rooms/getRooms",
      getUser: "authentication/getUser",
      getNextAppointment: "appointmentReport/getNextAppointment"
    })
  },

  created() {
    this.getPriceListsForDoctorAction({
      doctorId: this.getUser.id,
      clinicId: this.getUser.clinicId
    });
    this.getRoomsAction(this.getUser.clinicId);
  }
};
</script>

<style>
</style>