<template>
  <v-dialog v-model="dialog" width="700px" @click:outside="closeDialog()">
    <v-card class="px-12 py-6">
      <v-card-title v-if="type === 'add'">Add New Appointment</v-card-title>
      <v-card-title v-else>Edit Appointment</v-card-title>
      <v-card-text class="pt-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="10"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="appointment.date"
                label="Date"
                prepend-inner-icon="mdi-calendar"
                readonly
                :rules="rules"
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              :min="getCurrentTimeISO"
              first-day-of-week="1"
              v-model="appointment.date"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>

          <v-select
            outlined
            prepend-inner-icon="mdi-door"
            :items="getRooms"
            v-model="appointment.roomId"
            :rules="rules"
            item-text="name"
            item-value="id"
            label="Room"
          />
          <v-select
            outlined
            :items="getPriceLists"
            v-model="appointment.priceList"
            item-text="appointmentType.name"
            :rules="rules"
            prepend-inner-icon="mdi-language-typescript"
            @change="typeChanged"
            label="Price list entry"
            return-object
          />
          <v-select
            outlined
            :items="filteredDoctors"
            v-model="appointment.doctorId"
            :rules="rules"
            prepend-inner-icon="mdi-doctor"
            item-text="fullName"
            item-value="userId"
            label="Doctor"
          />

          <v-select
            :items="getTimeIntersection"
            v-model="appointment.time"
            label="Availabe Hours"
            :rules="rules"
            outlined
            prepend-inner-icon="mdi-watch"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog()">Cancel</v-btn>
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
export default {
  name: 'AppointmentDialog',
  components: {},

  data: () => ({
    rules: [v => !!v || 'This field is required'],
    filteredDocs: [],
    menu: false,
    valid: true,
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
      getDoctorTimesAction: 'doctors/getAvailableTimesAction',
      getRoomTimesAction: 'rooms/getAvailableTimesAction',
    }),

    ...mapMutations('freeAppointmentsDialog', {
      close: 'closeDialog',
    }),

    typeChanged() {
      if (!this.appointment.priceList) return;

      const appoTypeId = this.appointment.priceList.appointmentTypeId;
      // Return all doctors that specialize in this appointment type
      this.filteredDocs = this.getDoctors.filter(doc => {
        return doc.spec.some(sp => {
          return sp.appoType.id === appoTypeId;
        });
      });
    },

    async addAppointment() {
      if (!this.$refs.form.validate()) {
        return;
      }

      const dateTime = this.appointment.date + ' ' + this.appointment.time;
      this.appointment.start = moment(dateTime, 'YYYY-MM-DD HH:mm').unix();

      // Prepare fields for backend
      this.appointment.priceListId = this.appointment.priceList.id;
      this.appointment.clinicId = this.getUser.clinicId;
      delete this.appointment.priceList;

      console.log(this.appointment);
      await this.addAppointmentAction(this.appointment);
      this.closeDialog(true);
    },

    async updateAppointment() {
      if (!this.$refs.form.validate() || !this.appointment.start) {
        return;
      }
      // Prepare fields for backend
      this.appointment.priceListId = this.appointment.priceList.id;
      this.appointment.start = moment(this.appointment.start).unix();
      delete this.appointment.priceList;

      await this.updateAppointmentAction(this.appointment);
      this.closeDialog(true);
    },

    closeDialog(onlyReset) {
      if (onlyReset) {
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
      else this.$refs.form.resetValidation();

      this.close();
    },
  },
  computed: {
    ...mapGetters({
      dialog: 'freeAppointmentsDialog/getShowDialog',
      appointment: 'freeAppointmentsDialog/getDialogAppointment',
      type: 'freeAppointmentsDialog/getDialogType',
      getRooms: 'rooms/getRooms',
      getAvailableRoomTimes: 'rooms/getAvailableTimes',
      getAvailableDoctorTimes: 'doctors/getTimes',
      getDoctors: 'doctors/getDoctors',
      getPriceLists: 'priceLists/getPriceLists',
      getUser: 'authentication/getUser',
      getCurrentTimeISO: 'time/getCurrentTimeISO',
    }),

    filteredDoctors() {
      return this.filteredDocs;
    },

    // returns intersections of
    // available time of doctor and room
    getTimeIntersection() {
      return this.getAvailableRoomTimes.filter(
        value => this.getAvailableDoctorTimes.indexOf(value) > 0
      );
    },

    roomProp() {
      return this.appointment.roomId;
    },

    doctorProp() {
      return this.appointment.doctorId;
    },

    dateProp() {
      return this.appointment.date;
    },
  },

  watch: {
    dialog(val) {
      if (val == false) return;

      this.getPriceLists.map(pList => {
        if (pList.appointmentTypeId == this.appointment.appointmentTypeId) {
          this.appointment.priceList = pList;
        }
      });

      this.typeChanged();
    },

    // when date, room or doctor changed
    // reload available times
    async roomProp(val) {
      if (!val || !this.appointment.doctorId || !this.appointment.date) {
        return;
      }

      await this.getRoomTimesAction({
        roomId: val,
        date: moment(this.appointment.date, 'YYYY-MM-DD').unix(),
      });
    },

    async doctorProp(val) {
      if (!val || !this.appointment.roomId || !this.appointment.date) {
        return;
      }

      await this.getDoctorTimesAction({
        doctorId: val,
        date: moment(this.appointment.date, 'YYYY-MM-DD').unix(),
      });
    },

    async dateProp(val) {
      if (!val || !this.appointment.roomId || !this.appointment.doctorId) {
        return;
      }

      await this.getDoctorTimesAction({
        doctorId: this.appointment.doctorId,
        date: moment(val, 'YYYY-MM-DD').unix(),
      });

      await this.getRoomTimesAction({
        roomId: this.appointment.roomId,
        date: moment(val, 'YYYY-MM-DD').unix(),
      });
    },
  },
};
</script>

<style></style>
