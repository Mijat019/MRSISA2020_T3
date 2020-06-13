<template>
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
            <v-card-text>
              Appointment type: {{ selectedEvent.appointmentType }}
              <br />
              Room: {{ selectedEvent.roomName }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="selectedEvent.color === `red`"
                color="error"
                @click="cancelAppointment"
              >Cancel appointment</v-btn>
              <v-btn
                v-if="selectedEvent.color === `red`"
                color="primary"
                @click="openReport(selectedEvent.id)"
              >See appointment</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import calendarMixin from '../../../mixins/calendarMixin';
import { mapActions } from 'vuex';

export default {
  mixins: [calendarMixin],

  methods: {
    ...mapActions({
      cancelConfirmedAppointmentAction:
        'confirmedAppointments/cancelConfirmedAppointmentAction',
    }),

    async cancelAppointment() {
      if (confirm('Are you sure you want to cancel this appointment?')) {
        await this.cancelConfirmedAppointmentAction(this.selectedEvent.id);
        this.showMenu = false;
      }
    },
  },
};
</script>

<style></style>
