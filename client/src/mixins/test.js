const methods = {
    appointmentAdded() {
        this.newAppointment.dragable = false;
        this.closeNewAppointment();
        this.$emit("close");
    },

    closeNewAppointment() {
        this.newAppointment = null;
        this.getAppointmentsForCalendar.pop();
        this.selectedOpen = false;
    },

    createNewEvent({ date, time }) {
        if (this.newAppointment) {
            this.closeNewAppointment();
            return;
        }

        const start = `${date} ${time}`;
        let end = moment(start);
        end.add(1, "hour");
        end = end.format("YYYY-MM-DD HH:mm");
        this.newAppointment = {
            start,
            end,
            name: "New appointment",
            color: "blue",
            dragable: false,
            newEvent: true,
        };

        this.getAppointmentsForCalendar.push(this.newAppointment);
        this.selectedEvent = this.newAppointment;
        this.selectedOpen = true;
    },

    mousedown({ event }) {
        event.dragable = true;
    },

    mousemove({ date, time }) {
        if (this.newAppointment?.dragable) {
            const dateTime = `${date} ${time}`;
            const end = moment(dateTime);
            end.add(1, "hour");
            this.newAppointment.start = dateTime;
            this.newAppointment.end = end.format("YYYY-MM-DD HH:mm");
        }
    },

    mouseup() {
        if (this.newAppointment) {
            this.newAppointment.dragable = false;
        }
    },

    ...mapMutations({
        setNextAppointment: "appointmentReport/setNextAppointment",
    }),
};

const data = () => ({
    newAppointment: null,
});
