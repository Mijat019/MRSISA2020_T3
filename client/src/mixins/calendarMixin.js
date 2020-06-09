import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  data: () => ({
    today: moment().format('YYYY-MM-DD HH:mm'),
    type: 'week',
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    showMenu: false,
    focus: '',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
  }),

  methods: {
    ...mapActions({
      getFreeAppointmentsAction: 'freeAppointments/getFreeAppointmentsAction',
      getConfirmedAppointmentsAction:
        'confirmedAppointments/getConfirmedAppointmentsAction',
      getOperationsAction: 'operations/getOperationsAction',
      setNextAppointmentAction:
        'confirmedAppointments/appointmentReport/setNextAppointmentAction',
    }),

    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
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
        setTimeout(() => (this.showMenu = true), 10);
      };

      if (this.showMenu) {
        this.showMenu = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },

    nth(d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10];
    },

    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },

    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    },

    openReport(reportId) {
      this.setNextAppointmentAction(reportId);
      this.showMenu = false;
      this.$emit('changeTab', 'appointments');
    },
  },

  computed: {
    ...mapGetters({
      getUser: 'authentication/getUser',
      getFreeAppointments: 'confirmedAppointments/calendar/getFreeAppointments',
      getConfirmedAppointments:
        'confirmedAppointments/calendar/getConfirmedAppointments',
      getOperations: 'confirmedAppointments/calendar/getOperations',
    }),

    events() {
      return [
        ...this.getFreeAppointments,
        ...this.getConfirmedAppointments,
        ...this.getOperations,
      ];
    },

    title() {
      const { start, end } = this;
      if (!start || !end) {
        return '';
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? '' : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? '' : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`;
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return '';
    },

    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC',
        month: 'long',
      });
    },
  },

  async created() {
    await this.getFreeAppointmentsAction(this.getUser.id);
    await this.getConfirmedAppointmentsAction(this.getUser.id);
    await this.getOperationsAction(this.getUser.id);
  },
};
