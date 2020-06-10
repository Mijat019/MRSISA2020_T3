<template>
  <v-form ref="form" class="mt-5 mx-8" lazy-validation>
    <v-select
      label="Appointment type"
      :items="getPriceLists"
      v-model="priceListProp"
      outlined
      prepend-inner-icon="mdi-doctor"
      single
      item-text="appoType.name"
      return-object
    >
    </v-select>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="10"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateProp"
          label="Date"
          prepend-inner-icon="mdi-calendar"
          readonly
          outlined
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        no-title
        :min="getTomorrowsDate"
        first-day-of-week="1"
        v-model="dateProp"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>

    <v-select
      :items="getTimes"
      v-model="timeProp"
      label="Availabe Hours"
      outlined
      prepend-inner-icon="mdi-watch"
    ></v-select>
  </v-form>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import moment from 'moment'

export default {
  props: ['doctor', 'date', 'time', 'priceList'],
  data() {
    return {
      menu: false,
    };
  },

  methods: {
    ...mapActions({
      getPriceListsForDoctorAction: 'priceLists/getPriceListsForDoctorAction',
      getAvailableTimesAction: 'doctors/getAvailableTimesAction',
    }),

    ...mapMutations({}),

    async getAvailableTimes(payload) {
      await this.getAvailableTimesAction(payload);
    },
  },

  computed: {
    ...mapGetters({
      getPriceLists: 'priceLists/getPriceListsForDoctor',
      getTimes: 'doctors/getTimes',
    }),

    priceListProp: {
      get() {
        return this.priceList;
      },
      set(val) {
        this.$emit('priceListChanged', val);
      },
    },

    dateProp: {
      get() {
        return this.date;
      },
      set(val) {
        this.$emit('dateChanged', val);
      },
    },

    timeProp: {
      get() {
        return this.time;
      },
      set(val) {
        this.$emit('timeChanged', val);
      },
    },

    getTomorrowsDate() {
      const today = new Date();
      const tomorrow = new Date(today).setDate(today.getDate() + 1);
      return new Date(tomorrow).toISOString();
    },
  },

  watch: {
    date(value) {
      // // when date is changed reset time
      this.timeProp = '';

      if(!value) return;

      this.getAvailableTimes({
        doctorId: this.doctor.user.id,
        date: moment(value, 'YYYY-MM-DD').unix(),
      });
    },

    priceList(value) {
      this.timeProp = '';
    },
  },

  async mounted() {
    await this.getPriceListsForDoctorAction({
      doctorId: this.doctor.user.id,
      clinicId: this.doctor.clinicId,
    });
  },
};
</script>

<style></style>
