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
          :events="appointments"
          :now="today"
          :type="type"
          :value="today"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
          :event-color="getEventColor"
          first-interval="7"
          interval-minutes="60"
          interval-count="8"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              Appointment type: {{ selectedEvent.appointmentType }}
              <br />
              Room: {{ selectedEvent.roomName }}
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  data: () => ({
    today: moment().format("YYYY-MM-DD HH:mm"),
    type: "week",
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    focus: "",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    }
  }),

  methods: {
    ...mapActions({
      getFreeAppointmentsAction: "freeAppointments/getFreeAppointmentsAction",
      getConfirmedAppointmentsAction:
        "confirmedAppointments/getConfirmedAppointmentsAction"
    }),

    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    }
  },
  computed: {
    ...mapGetters({
      getFreeAppointments: "freeAppointments/getFreeAppointments",
      getConfirmedAppointments:
        "confirmedAppointments/getConfirmedAppointments",
      getUser: "authentication/getUser"
    }),

    appointments() {
      const result = [
        ...this.getFreeAppointments.map(item => {
          const end = moment.utc(item.start);
          end.add(item.duration, "seconds");
          return {
            color: "green",
            appointmentType: item.priceList.appointmentType.name,
            roomName: item.room.name,
            name: `${item.priceList.appointmentType.name} ${item.room.name}`,
            start: moment.utc(item.start).format("YYYY-MM-DD HH:mm"),
            end: end.format("YYYY-MM-DD HH:mm")
          };
        }),
        ...this.getConfirmedAppointments.map(item => {
          const end = moment.utc(item.start);
          end.add(item.duration, "seconds");
          return {
            color: "red",
            appointmentType: item.priceList.appointmentType.name,
            roomName: item.room.name,
            name: `${item.priceList.appointmentType.name} ${item.room.name}`,
            start: moment.utc(item.start).format("YYYY-MM-DD HH:mm"),
            end: end.format("YYYY-MM-DD HH:mm")
          };
        })
      ];
      return result;
    },

    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  async created() {
    await this.getFreeAppointmentsAction(this.getUser.id);
    await this.getConfirmedAppointmentsAction(this.getUser.id);
  }
};
</script>

<style></style>
