<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
    <v-card>
      <v-card-title>
        Occupancy calendar
        <v-spacer></v-spacer>
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-calendar
        ref="calendar"
        v-model="focus"
        :events="events"
        :event-color="getEventColor"
        type="4day"
        >

        </v-calendar>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import moment from "moment";
export default {
  name: "RoomOccupancyDialog",

  data() {
    return {
      focus: ''
    }
  },

  methods: {
    ...mapMutations({
      close: "roomOccupancyDialog/closeDialog"
    }),

    getEventColor(event) {
      return event.color;
    },

    prev () {
      this.$refs.calendar.prev()
    },
    
    next () {
      this.$refs.calendar.next()
    }

  },

  computed: {
    ...mapGetters("roomOccupancyDialog", {
      occupancies: "getOccupancies",
      dialog: "getDialog"
    }),

    events() {
      let events = [];
      this.occupancies.freeAppointments.forEach(element => {
        events.push({
          start: moment.unix(element.start).format("YYYY-MM-DD hh:mm"),
          end: moment.unix(element.start + 1800).format("YYYY-MM-DD hh:mm"),
          name: "Free appointment",
          timed: true,
          color: 'green',
        });
      });

      this.occupancies.confirmedAppointments.forEach(element => {
        events.push({
          start: moment.unix(element.start).format("YYYY-MM-DD hh:mm"),
          end: moment.unix(element.start + 1800).format("YYYY-MM-DD hh:mm"),
          name: "Confirmed appointment",
          timed: true,
          color: 'amber'
        });
      });

      this.occupancies.operations.forEach(element => {
        events.push({
          start: moment.unix(element.start).format("YYYY-MM-DD hh:mm"),
          end: moment.unix(element.start + 1800).format("YYYY-MM-DD hh:mm"),
          name: "Operation",
          timed: true,
          color: 'red'
        });
      });

      return events;
    }
  }
};
</script>

<style></style>
