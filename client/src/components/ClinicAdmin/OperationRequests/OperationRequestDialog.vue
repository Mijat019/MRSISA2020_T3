<template>
  <v-dialog width="50%" v-model="value.showDialog" @click:outside="$emit('input', {})">
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Select a room</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">Change time</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Who will attend the operation</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card>
            <v-card-text>
              <v-list>
                <v-list-item :key="index" v-for="(item, index) in items">
                  <v-list-item-avatar>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.subtitle}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-map-marker</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-form ref="form" lazy-validation>
                      <v-select
                        label="Select a room"
                        class="pa-0 ma-0"
                        :items="getAvailableRooms"
                        item-text="name"
                        item-value="id"
                        v-model="roomId"
                        :rules="[v => !!v || `Required`]"
                      ></v-select>
                    </v-form>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="$emit(`input`, {})">Cancel</v-btn>
              <v-btn color="primary" @click="toStep3">Contunue</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <v-card-text>
              <v-list>
                <v-list-item :key="index" v-for="(item, index) in items.slice(0, 4)">
                  <v-list-item-avatar>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.subtitle}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-calendar</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
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
                          label="Choose a day for the operation"
                          readonly
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
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-map-marker</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-form ref="form2" lazy-validation>
                      <v-select
                        label="Select a room"
                        class="pa-0 ma-0"
                        :items="getRooms"
                        item-text="name"
                        item-value="id"
                        v-model="newRoomId"
                        :rules="[v => !!v || `Required`]"
                      ></v-select>
                    </v-form>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-clock</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-select v-model="newHours" :items="getAvailableTimes" label="Select the time"></v-select>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="step = 1">Back</v-btn>
              <v-btn color="primary" @click="fromStep2To3">Continue</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card>
            <v-card-text>
              <ManageOperationAttendance
                v-if="value.item"
                v-model="value.item.doctorIds"
                :doctorId="value.item.doctorId"
                :start="value.item.start"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="step = 2">Back</v-btn>
              <v-btn color="primary" @click="schedule">Finish</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>

<script>
import ManageOperationAttendance from './ManageOperationAttendance.vue';
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
export default {
  name: 'OperationRequestDialog',

  components: { ManageOperationAttendance },

  props: ['value'],

  data: () => ({
    step: 1,
    roomId: null,
    menu: false,
    newDate: '',
    newHours: '',
    newRoomId: null,
  }),

  computed: {
    ...mapGetters({
      getRooms: 'rooms/getRooms',
      getAvailableRooms: 'rooms/getAvailableRooms',
      getAvailableTimes: 'rooms/getAvailableTimes',
      getUser: 'authentication/getUser',
    }),

    items() {
      const { item } = this.value;
      return [
        { icon: 'mdi-account', title: 'Doctor', subtitle: item?.doctor },
        {
          icon: 'mdi-email',
          title: 'Doctors email',
          subtitle: item?.doctorEmail,
        },
        { icon: 'mdi-account', title: 'Patient', subtitle: item?.patient },
        {
          icon: 'mdi-email',
          title: 'Patients email',
          subtitle: item?.patientEmail,
        },
        { icon: 'mdi-clock', title: 'Start', subtitle: item?.time },
      ];
    },
  },

  methods: {
    ...mapActions({
      getAvailableRoomsAction: 'rooms/getAvailableRoomsAction',
      getRoomsAction: 'rooms/getRoomsAction',
      getAvailableTimesAction: 'rooms/getAvailableTimesAction',
      scheduleOperation: 'operationRequests/scheduleOperation',
    }),

    toStep3() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.step = 3;
    },

    fromStep2To3() {
      if (!this.$refs.form2.validate()) {
        return;
      }

      this.roomId = this.newRoomId;
      this.value.item.start = moment(`${this.newDate} ${this.newHours}`).unix();
      this.step = 3;
    },

    schedule() {
      const { item } = this.value;
      const operation = {
        requestId: item.id,
        operationPayload: {
          roomId: this.roomId,
          start: item.start,
          patientMedicalRecordId: item.patientMedicalRecordId,
          doctorId: item.doctorId,
          clinicId: item.clinicId,
          duration: 60,
        },
        doctorIds: item.doctorIds.map(el => el.id),
      };

      this.$emit('input', {
        showDialog: false,
        item: {
          doctorIds: [],
        },
      });
      this.scheduleOperation(operation);
    },
  },

  async mounted() {
    this.getRoomsAction();

    const { item } = this.value;
    await this.getAvailableRoomsAction({
      clinicId: item.clinicId,
      date: item.start,
    });

    if (this.getAvailableRooms.length === 0) {
      this.step = 2;
    }
  },

  watch: {
    newDate(newValue) {
      if (newValue && this.newRoomId) {
        this.getAvailableTimesAction({
          roomId: this.roomId,
          date: moment(newValue, 'YYYY-MM-DD').unix(),
        });
      }
    },
  },
};
</script>
    
<style>
</style>