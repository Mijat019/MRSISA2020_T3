<template>
  <v-dialog
    :value="dialog"
    width="600px"
    @click:outside="close"
    :retain-focus="false"
  >
    <v-card class="py-3">
      <v-card-title class="headline">
        <v-row justify="center">
          <v-col cols="2">
            <v-btn icon @click="stepBackwards">
              <v-icon large>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="8" align="center" class="font-weight-bold">
            New Appointment
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>
      </v-card-title>

      <v-card-subtitle class="mx-12">
        <v-row justify="center" class="mx-4">
          <v-col align="center">
            <v-btn
              :class="[
                step == 1 ? 'black--text font-weight-bold' : 'grey--text',
              ]"
              text
            >
              Details
            </v-btn>

            <div>
              <v-avatar color="blue" size="25" class="white--text">
                1
              </v-avatar>
            </div>
          </v-col>

          <v-icon color="grey" class="pt-5">mdi-arrow-right</v-icon>
          <v-col align="center">
            <v-btn
              :class="[
                step == 2 ? 'black--text font-weight-bold' : 'grey--text',
              ]"
              text
            >
              Confirm
            </v-btn>
            <div>
              <v-avatar
                :class="[step == 2 ? 'blue white--text' : 'grey white--text']"
                size="25"
              >
                2
              </v-avatar>
            </div>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <!-- FORMA -->
      <v-card-text>
        <DoctorAppoDialog
          :priceList="priceList"
          @priceListChanged="priceList = $event"
          :date="date"
          @dateChanged="date = $event"
          :time="time"
          @timeChanged="time = $event"
          :doctor="doctor"
          :hidden="step != 1"
        />

        <DialogPageThree
          :name="doctor.clinic.name"
          :type="priceList.appoType.name"
          :date="date"
          :time="time"
          :price="priceList.appoType.priceList[0].price"
          :doctor="doctor.fullName"
          :hidden="step != 2"
        />
      </v-card-text>

      <v-card-actions class="mx-10">
        <v-spacer></v-spacer>
        <v-btn
          @click="nextStep"
          class="blue white--text px-5 text-none"
          rounded
          x-large
        >
          <span v-if="step < 3">Continue</span>
          <span v-else>Send Request</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { bus } from '../../../../main';
import DialogPageThree from './../Clinics/DialogPageThree';
import DoctorAppoDialog from './DoctorAppoDialog';
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  components: {
    DoctorAppoDialog,
    DialogPageThree,
  },
  data() {
    return {
      dialog: false,
      doctor: { fullName: '', clinic: '' },
      date: '',
      time: '',
      priceList: { id: -1, price: 0, appoType: {name: '', priceList:[{}]} },
      step: 1,
    };
  },

  methods: {
    ...mapActions('scheduleCustomAppointment', {
      requestAppointmentAction: 'requestAppointmentAction',
    }),

    nextStep() {
      if (this.step == 1) return this.handleDetailsStep();

      // step 2 is last step
      this.schedule();
    },

    stepBackwards() {
      if (this.step > 1) return --this.step;
      this.close();
    },

    handleDetailsStep() {
      // check if inputs are filled in
        if (!this.priceList.id < 0 || !this.date || !this.time) return;

      this.step++;
    },

    async schedule() {
      const dateTime = this.date + ' ' + this.time;
      const start = moment(dateTime, 'YYYY-MM-DD HH:mm');

      const payload = {
        priceListId: this.priceList.appoType.priceList[0].id,
        clinicId: this.doctor.clinicId,
        patientMedicalRecordId: this.user.id,
        doctorId: this.doctor.user.id,
        duration: 30,
        start: start,
      };

      await this.requestAppointmentAction(payload);
      this.resetFields();
      this.close();
    },

    resetFields() {
      this.step = 1;
      this.doctor = { fullName: '', clinic: '' };
      this.date = '';
      this.time = '';
      this.priceList = { id: -1, price: 0, appoType: {name: '', priceList:[{}]} };
    },

    close() {
      this.resetFields();
      this.dialog = false;
    },
  },

  computed: {
    ...mapGetters('authentication', {
      user: 'getUser',
    }),
  },

  created() {
    bus.$on('doctorChosen', data => {
      this.doctor = data;
      this.dialog = true;
    });
  },
};
</script>

<style></style>
