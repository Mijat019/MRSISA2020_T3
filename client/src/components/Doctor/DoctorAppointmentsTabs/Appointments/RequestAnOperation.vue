<template>
  <v-dialog v-model="dialog" fullscreen>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">Request an operation</v-btn>
    </template>
    <v-card>
      <v-card-title>
        Request an operation
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row class="fill-height">
          <v-col>
            <v-sheet height="64">
              <v-toolbar flat color="white">
                <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                  <v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                  <v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                <v-toolbar-title>{{ title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                  <template v-slot:activator="{ on }">
                    <v-btn outlined color="grey darken-2" v-on="on">
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Day</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                      <v-list-item-title>4 days</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet>
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="getEvents"
                :now="today"
                :type="type"
                :value="today"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="updateRange"
                :event-color="getEventColor"
                @click:time="clickedOnCalendar"
                @mousedown:event="mousedownOnEvent"
                @mousemove:time="dragEvent"
                @mouseup:event="dropEvent"
              >
                <template v-slot:day-body></template>
              </v-calendar>

              <v-menu
                v-model="showMenu"
                :activator="selectedElement"
                :close-on-content-click="false"
                offset-x
              >
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar :color="selectedEvent.color" dark>
                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="showMenu = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-actions>
                    <v-btn color="primary" @click="requestAnOperation">Request an operation</v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import moment from 'moment';
import calendarMixin from '../../../../mixins/calendarMixin';

export default {
  name: 'RequestAnOperation',
  mixins: [calendarMixin],

  data: () => ({
    dialog: false,
    operation: null,
  }),

  computed: {
    ...mapGetters({
      getUser: 'authentication/getUser',
      getNextAppointment:
        'confirmedAppointments/appointmentReport/getNextAppointment',
    }),
  },

  methods: {
    ...mapActions({
      createOperationRequest: 'operationRequests/createOperationRequest',
    }),

    ...mapMutations({
      addEvent: 'confirmedAppointments/calendar/addEvent',
      removeLastEvent: 'confirmedAppointments/calendar/removeLastEvent',
    }),

    clickedOnCalendar({ date, time }) {
      if (this.operation) {
        this.closeOperation();
        return;
      }

      this.createOperation(date, time);
      this.selectedEvent = this.operation;
      this.showMenu = true;
    },

    closeOperation() {
      this.operation = null;
      this.removeLastEvent();
      this.showMenu = false;
    },

    createOperation(date, time) {
      let start = `${date} ${time}`;
      start = this.getClosestMinute(start);
      const end = this.getEndOfEvent(start);
      this.operation = {
        start,
        end,
        name: 'Operation',
        color: 'blue',
        draggable: false,
      };

      this.addEvent(this.operation);
    },

    getClosestMinute(dateTime) {
      const date = moment(dateTime);
      const minutes = date.get('minute');
      if (minutes >= 0 && minutes < 30) {
        date.set('minute', 0);
      } else if (minutes >= 30 && minutes < 60) {
        date.set('minute', 30);
      }

      return date.format('YYYY-MM-DD HH:mm');
    },

    getEndOfEvent(start) {
      const end = moment(start);
      end.add(1, 'hour');
      return end.format('YYYY-MM-DD HH:mm');
    },

    mousedownOnEvent({ event }) {
      event.draggable = true;
    },

    dragEvent({ date, time }) {
      if (this.operation?.draggable) {
        const dateTime = `${date} ${time}`;
        const start = this.getClosestMinute(dateTime);
        // no need to rerender if the time hasn't changed enough
        if (start === dateTime) {
          return;
        }

        const end = this.getEndOfEvent(start);
        this.operation.start = start;
        this.operation.end = end;
      }
    },

    dropEvent() {
      if (this.operation) {
        this.operation.draggable = false;
      }
    },

    requestAnOperation() {
      const operationRequest = {
        doctorId: this.getUser.id,
        clinicId: this.getUser.clinicId,
        patientMedicalRecordId: this.getNextAppointment.patient.user.id,
        start: moment(this.selectedEvent.start).unix(),
        duration: 60,
      };
      this.closeOperation();
      this.createOperationRequest(operationRequest);
      this.dialog = false;
    },
  },
};
</script>

<style></style>