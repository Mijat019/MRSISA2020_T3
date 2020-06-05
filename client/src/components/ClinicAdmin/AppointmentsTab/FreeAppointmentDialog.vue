<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
    <v-card>
      <v-card-title v-if="type === 'add'">Add New Appointment</v-card-title>
      <v-card-title v-else>Edit Appointment</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <div>
            <div class="datetime-input mb-2 mt-5">
              <datetime
                type="datetime"
                :min-datetime="getCurrentTimeISO"
                placeholder="Select date"
                v-model="appointment.start"
                :minute-step="15"
                auto
              />
            </div>
            <hr class="mb-6" />
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
            :items="getPriceLists"
            v-model="appointment.priceList"
            item-text="appointmentType.name"
            :return-object="true"
            label="Price list entry"
          />
          <v-select
            v-if="appointment.priceList"
            :items="filteredDoctors"
            v-model="appointment.doctorId"
            item-text="fullName"
            item-value="userId"
            label="Doctor"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn v-if="type === 'add'" color="primary" @click="addAppointment"
          >Add</v-btn
        >
        <v-btn v-else color="primary" @click="updateAppointment">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { Datetime } from 'vue-datetime';
export default {
  name: 'AppointmentDialog',
  components: {
    datetime: Datetime,
  },

  data: () => ({
    rules: [v => !!v || 'This field is required'],
  }),
  mounted() {
    this.getRoomsAction();
    this.getDoctorsByClinicAction(this.getUser.clinicId);
    this.getPriceListsAction(this.getUser.clinicId);
  },
  methods: {
    ...mapActions({
      addAppointmentAction: 'freeAppointments/addFreeAppointmentAction',
      updateAppointmentAction: 'freeAppointments/updateFreeAppointmentAction',
      getRoomsAction: 'rooms/getRoomsAction',
      getPriceListsAction: 'priceLists/getPriceListsAction',
      getDoctorsByClinicAction: 'doctors/getDoctorsByClinicAction',
    }),

    ...mapMutations('freeAppointmentsDialog', {
      close: 'closeDialog',
    }),

    async addAppointment() {
      if (!this.$refs.form.validate() || !this.appointment.start) {
        return;
      }

      //convert datetime to unix seconds
      this.appointment.start = moment(this.appointment.start).unix();

      // Prepare fields for backend
      this.appointment.priceListId = this.appointment.priceList.id;
      delete this.appointment.priceList;

      await this.addAppointmentAction(this.appointment);
      this.close();
    },

    async updateAppointment() {
      if (!this.$refs.form.validate() || !this.appointment.start) {
        return;
      }
      // Prepare fields for backend
      this.appointment.priceListId = this.appointment.priceList.id;
      delete this.appointment.priceList;

      await this.updateAppointmentAction(this.appointment);
      this.close();
    },
  },
  computed: {
    ...mapGetters({
      dialog: 'freeAppointmentsDialog/getShowDialog',
      appointment: 'freeAppointmentsDialog/getDialogAppointment',
      type: 'freeAppointmentsDialog/getDialogType',
      getRooms: 'rooms/getRooms',
      getDoctors: 'doctors/getDoctors',
      getPriceLists: 'priceLists/getPriceLists',
      getUser: 'authentication/getUser',
      getCurrentTimeISO: 'time/getCurrentTimeISO',
    }),

    filteredDoctors() {
      const appoTypeId = this.appointment.priceList.appointmentTypeId;
      // Return all doctors that specialize in this appointment type
      return this.getDoctors.filter(doc => {
        return doc.spec.some(sp => {
          return sp.appoType.id === appoTypeId;
        });
      });
    },
  },
};
</script>

<style></style>
