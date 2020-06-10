<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
    <v-card>
      <v-card-title>Schedule an appointment</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-select
            :items="clinics"
            v-model="clinic"
            item-text="name"
            item-value="id"
            label="Clinic"
          />
          <v-select
            :items="getPriceLists"
            v-model="appointment.priceListId"
            item-text="name"
            item-value="id"
            label="Appointment type"
          />
          <v-select
            :items="doctors"
            v-model="appointment.doctorId"
            item-text="fullName"
            item-value="userId"
            label="Doctor"
          />
          <div class="datetime-input mb-2">
            <datetime
              type="datetime"
              placeholder="Select date"
              :min-datetime="getCurrentTimeISO"
              v-model="appointment.start"
              :minute-step="30"
              auto
            />
          </div>
          <hr class="mb-4">
          <v-text-field type="number" label="Duration(in minutes)" v-model="appointment.duration" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="requestAppointment">Schedule</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Datetime } from "vue-datetime";

export default {
  data() {
    return {
      clinic: null
    };
  },

  components: {
    datetime: Datetime
  },
  methods: {
    ...mapMutations("scheduleCustomAppointmentDialog", {
      close: "closeDialog",
      reset: "resetDialogValues"
    }),

    ...mapActions({
      getPriceListsAction: "priceLists/getPriceListsAction",
      getDoctorsByClinicAction: "doctors/getDoctorsByClinicAction",
      requestAppointmentAction:
        "scheduleCustomAppointment/requestAppointmentAction"
    }),

    async requestAppointment() {
      if (!this.$refs.form.validate() || !this.appointment.start) {
        return;
      }

      this.appointment.patientMedicalRecordId = this.getUser.id;
      this.appointment.clinicId = this.clinic;
      this.appointment.start = moment(this.appointment.start).unix();
      await this.requestAppointmentAction(this.appointment);
      this.close();
    }
  },

  computed: {
    ...mapGetters({
      dialog: "scheduleCustomAppointmentDialog/getShowDialog",
      appointment: "scheduleCustomAppointmentDialog/getDialogAppointment",
      clinics: "clinics/getClinics",
      priceLists: "priceLists/getPriceLists",
      doctors: "doctors/getDoctors",
      getUser: "authentication/getUser",
      getCurrentTimeISO: "time/getCurrentTimeISO"
    }),

    getPriceLists() {
      return this.priceLists.map(priceL => {
        return {
          name: priceL.appointmentType.name + "\t" + priceL.price,
          id: priceL.id
        };
      });
    },

    minDateISO() {
      return new Date().toISOString();
    }
  },

  watch: {
    async clinic(value) {
      // reset all when clinic is changed
      this.reset();
      await this.getPriceListsAction(value);
      await this.getDoctorsByClinicAction(value);
    }
  }
};
</script>

<style>


</style>
