<template>
  <v-dialog v-model="dialog" fullscreen>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">Schedule another appointment</v-btn>
    </template>

    <v-card>
      <v-card-title>
        Schedule an appointment
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
                <v-btn
                  outlined
                  class="mr-4"
                  color="grey darken-2"
                  @click="setToday"
                  >Today</v-btn
                >
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
                @click:time="clickedOnCalendar"
                @mousedown:event="mousedownOnEvent"
                @mousemove:time="dragEvent"
                @mouseup:event="dropEvent"
                @change="updateRange"
                :event-color="getEventColor"
              >
                <template v-slot:day-body></template>
              </v-calendar>

              <v-menu
                v-if="selectedEvent.newEvent"
                offset-x
                :close-on-content-click="false"
                v-model="selectedOpen"
              >
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar :color="selectedEvent.color" dark>
                    <v-toolbar-title
                      v-html="selectedEvent.name"
                    ></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="closeNewAppointment" icon>
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <NewAppointmentForm
                      :start="selectedEvent.start"
                      v-on:appointmentAdded="appointmentAdded"
                    />
                  </v-card-text>
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
import moment from 'moment';
import { mapGetters } from 'vuex';
import calendarMixin from '../../../../mixins/calendarMixin';

import NewAppointmentForm from './NewAppointmentForm';

export default {
  name: 'ScheduleAnotherAppointment',

  components: {
    NewAppointmentForm,
  },

  mixins: [calendarMixin],

  data: () => ({
    newAppointment: null,
    dialog: false,
  }),

  computed: {
    ...mapGetters({
      getEvents: 'confirmedAppointments/calendar/getEvents',
    }),
  },

  methods: {
    appointmentAdded() {
      this.newAppointment.draggable = false;
      this.closeNewAppointment();
      this.dialog = false;
    },

    closeNewAppointment() {
      this.newAppointment = null;
      this.getEvents.pop();
      this.selectedOpen = false;
    },

    clickedOnCalendar({ date, time }) {
      if (this.newAppointment) {
        this.closeNewAppointment();
        return;
      }

      this.createNewEvent(date, time);
      this.selectedEvent = this.newAppointment;
      this.selectedOpen = true;
    },

    createNewEvent(date, time) {
      let start = `${date} ${time}`;
      start = this.getClosestMinute(start);
      const end = this.getEndOfEvent(start);
      this.newAppointment = {
        start,
        end,
        name: 'New appointment',
        color: 'blue',
        draggable: false,
        newEvent: true,
      };

      this.getEvents.push(this.newAppointment);
    },

    mousedownOnEvent({ event }) {
      event.draggable = true;
    },

    dragEvent({ date, time }) {
      if (this.newAppointment?.draggable) {
        const dateTime = `${date} ${time}`;
        const start = this.getClosestMinute(dateTime);
        // no need to rerender if the time hasn't changed enough
        if (start === dateTime) {
          return;
        }

        const end = this.getEndOfEvent(start);
        this.newAppointment.start = start;
        this.newAppointment.end = end;
      }
    },

    getClosestMinute(dateTime) {
      const date = moment(dateTime);
      const minutes = date.get('minute');
      if (minutes >= 0 && minutes < 15) {
        date.set('minute', 0);
      } else if (minutes >= 15 && minutes < 30) {
        date.set('minute', 15);
      } else if (minutes >= 30 && minutes < 45) {
        date.set('minute', 30);
      } else if (minutes >= 45 && minutes < 60) {
        date.set('minute', 45);
      }

      return date.format('YYYY-MM-DD HH:mm');
    },

    getEndOfEvent(start) {
      const end = moment(start);
      end.add(1, 'hour');
      return end.format('YYYY-MM-DD HH:mm');
    },

    dropEvent() {
      if (this.newAppointment) {
        this.newAppointment.draggable = false;
      }
    },
  },
};
</script>

<style></style>
