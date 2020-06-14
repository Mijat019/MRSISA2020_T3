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
    <v-data-table :headers="headers" :items="appointments" item-key="id" :search="search">
      <template v-slot:item.actions="{ item }">
        <div>
          <v-btn class="mx-2" @click="openApproveDialog(item)" color="success" small>Approve</v-btn>
          <v-btn @click="openRejectDialog(item)" color="error" small>reject</v-btn>
        </div>
      </template>
      <template #item.start="{ item }">{{ format(item.start) }}</template>
    </v-data-table>

    <!-- APPROVE DIALOG -->
    <v-dialog v-model="dialogApprove" width="50%" @click:outside="cancel" :retain-focus="false">
      <v-card class="px-5">
        <v-card-title>Select a room for the appointment</v-card-title>
        <v-card-text>
          <!-- if has avilable rooms -->
          <v-select
            v-if="availableRooms > 0"
            :items="getAvailableRooms"
            v-model="room"
            item-text="name"
            item-value="id"
            label="Room"
          />

          <!-- If no available rooms -->
          <v-container class v-else>
            <v-row class="mt-5"></v-row>
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
                  v-model="newDate"
                  label="Date"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  outlined
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                :min="new Date().toISOString()"
                first-day-of-week="1"
                v-model="newDate"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>

            <v-row class>
              <v-select
                :items="getRooms"
                v-model="newRoom"
                item-text="name"
                outlined
                prepend-inner-icon="mdi-door"
                item-value="id"
                label="Room"
              />
            </v-row>

            <v-row class>
              <v-select
                :items="getAvailableTimes"
                v-model="newTime"
                label="Availabe Hours"
                outlined
                prepend-inner-icon="mdi-watch"
              ></v-select>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mx-3">
          <v-spacer></v-spacer>
          <v-btn class="mx-3" @click="cancel">Cancel</v-btn>
          <v-btn @click="approve(editedItem)" color="success">Approve</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Reject Dialog -->
    <v-dialog v-model="dialogReject" width="50%" @click:outside="cancel">
      <v-card>
        <v-card-title>What is the reason of rejection?</v-card-title>
        <v-card-text>
          <v-textarea hint="Reason" v-model="reason"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn @click="reject(editedItem)" color="error">Reject</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  components: {},
  data: () => ({
    menu: false,
    dialogReject: false,
    dialogApprove: false,
    room: null,
    availableRooms: 0,
    newDate: '',
    newTime: '',
    newRoom: '',
    reason: '',
    search: '',
    editedItem: '',
    headers: [
      { text: 'Patient', value: 'patientMedicalRecord.user.firstName' },
      { text: 'Doctor', value: 'doctor.user.firstName' },
      { text: 'Appointment type', value: 'priceList.appointmentType.name' },
      { text: 'Time', value: 'start' },
      { text: 'Price', value: 'priceList.price' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
    ],
  }),

  methods: {
    ...mapActions('scheduleCustomAppointment', {
      getAllForClinicAction: 'getAllForClinicAction',
      confirmRequestAction: 'confirmRequestAction',
      rejectRequestAction: 'rejectRequestAction',
      updateRequestAction: 'updateRequestAction',
    }),

    ...mapActions('rooms', {
      getRoomsAction: 'getRoomsAction',
      getAvailableRoomsAction: 'getAvailableRoomsAction',
      getAvailableTimesAction: 'getAvailableTimesAction',
    }),

    async openApproveDialog(item) {
      this.dialogApprove = true;
      this.editedItem = item;
      await this.getAvailableRoomsAction({
        clinicId: item.clinicId,
        date: item.start,
      });

      this.availableRooms = this.getAvailableRooms.length;
      this.newDate = moment.unix(item.start).format('YYYY-MM-DD');
    },

    openRejectDialog(item) {
      this.dialogReject = true;
      this.editedItem = item;
    },

    async approve(item) {
      // if there was available room
      if (this.availableRooms > 0) {
        if (!this.room) return;
        item.roomId = this.room;
        await this.confirmRequestAction(item);
        this.cancel();
        return;
      }

      // if there was no rooms update request first then confirm it
      item.start = moment(
        this.newDate + ' ' + this.newTime,
        'YYYY-MM-DD HH:mm'
      ).unix();
      try {
        await this.updateRequestAction(item);
      } catch {
        alert('Update failed, Try again or reject');
        return;
      }
      console.log(item);
      item.roomId = this.newRoom;
      await this.confirmRequestAction(item);
      this.cancel();
    },

    async reject(item) {
      item.reason = this.reason;
      await this.rejectRequestAction(item);
      this.cancel();
    },

    cancel() {
      this.reason = '';
      this.dialogReject = false;
      this.room = null;
      this.dialogApprove = false;
    },

    format(item) {
      if (!item) return '';

      return moment.unix(item).format('YYYY-MM-DD HH:mm');
    },
  },
  async created() {
    await this.getAllForClinicAction(this.user.clinicId);
    await this.getRoomsAction(this.user.clinicId);
  },

  watch: {
    newDate(val) {
      if (val && this.newRoom) {
        this.getAvailableTimesAction({
          roomId: this.newRoom,
          date: moment(val, 'YYYY-MM-DD').unix(),
        });
      }
    },

    newRoom(val) {
      if (val && this.newDate) {
        this.getAvailableTimesAction({
          roomId: val,
          date: moment(this.newDate, 'YYYY-MM-DD').unix(),
        });
      }
    },
  },

  computed: {
    ...mapGetters({
      appointments: 'scheduleCustomAppointment/getAppointmentRequests',
      user: 'authentication/getUser',
      getRooms: 'rooms/getRooms',
      getAvailableRooms: 'rooms/getAvailableRooms',
      getAvailableTimes: 'rooms/getAvailableTimes',
      getCurrentTimeISO: 'time/getCurrentTimeISO',
    }),

    noRooms() {
      return this.availableRooms == 0;
    },
  },
};
</script>

<style></style>
