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
              <v-avatar color="blue" size="25" class="white--text">1</v-avatar>
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
              Doctor
            </v-btn>
            <div>
              <v-avatar
                :class="[step > 1 ? 'blue white--text' : 'grey white--text']"
                size="25"
                >2</v-avatar
              >
            </div>
          </v-col>

          <v-icon color="grey" class="pt-5">mdi-arrow-right</v-icon>
          <v-col align="center">
            <v-btn
              :class="[
                step == 3 ? 'black--text font-weight-bold' : 'grey--text',
              ]"
              text
            >
              Confirm
            </v-btn>
            <div>
              <v-avatar
                :class="[step > 2 ? 'blue white--text' : 'grey white--text']"
                size="25"
                >3</v-avatar
              >
            </div>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <!-- FORMA -->
      <v-card-text>
        <DialogPageOne
          :name="clinic.name"
          :type="appoType.name"
          :price="priceList.price"
          :hidden="step != 1"
        />

        <DialogPageTwo
          :clinic="clinic"
          :appoType="appoType"
          :date="date"
          @dateChanged="date = $event"
          :time="time"
          @timeChanged="time = $event"
          :doctor="doctor"
          @doctorChanged="doctor = $event"
          :hidden="step != 2"
        />

        <DialogPageThree
          :name="clinic.name"
          :type="appoType.name"
          :date="date"
          :time="time"
          :price="priceList.price"
          :doctor="doctor.fullName"
          :hidden="step != 3"
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
import DialogPageOne from './DialogPageOne';
import DialogPageTwo from './DialogPageTwo';
import DialogPageThree from './DialogPageThree';
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment'

export default {
  components: {
    DialogPageOne,
    DialogPageTwo,
    DialogPageThree,
  },
  data() {
    return {
      dialog: false,
      appoType: { name: '' },
      clinic: { name: '' },
      doctor: { fullName: '' },
      date: null,
      time: null,
      priceList: { id: -1, price: 0 },
      step: 1,
    };
  },

  methods: {
    ...mapActions('scheduleCustomAppointment',{
      requestAppointmentAction: 'requestAppointmentAction',
    }),

    nextStep() {
      if (this.step == 1) return ++this.step;
      if (this.step == 2) return this.handleDoctorStep();

      // step 3 is last step
      this.schedule();
    },

    stepBackwards() {
      if (this.step > 1) return --this.step;
      this.close();
    },

    handleDoctorStep() {
      // check if inputs are filled in
      if (!this.doctor.user || !this.date || !this.time) return;

      this.step++;
    },

    async schedule() {

      const dateTime = this.date + ' ' + this.time;
      const start = moment(dateTime, "YYYY-MM-DD HH:mm");

      const payload = {
        priceListId: this.priceList.id,
        clinicId: this.clinic.id,
        patientMedicalRecordId: this.user.id,
        doctorId: this.doctor.user.id,
        duration: 30,
        start: start.unix(),
      };

      await this.requestAppointmentAction(payload);
      this.resetFields();
      this.close();
    },

    resetFields() {
      this.step = 1;
      this.appoType = { name: '' };
      this.clinic = { name: '' };
      this.doctor =  { fullName: '' };
      this.date = null;
      this.time =  null;
      this.priceList = { id: -1, price: 0 };
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
    bus.$on('clinicChosen', data => {
      this.step = 1;
      this.clinic = data.clinic;
      this.appoType = data.appoType;
      this.priceList = data.priceList;
      this.dialog = true;
    });
  },
};
</script>

<style></style>
