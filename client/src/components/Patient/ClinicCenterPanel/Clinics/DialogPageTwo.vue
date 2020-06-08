<template>
  <v-form ref="form" class="mt-5 mx-8" lazy-validation>
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
        v-model="dateProp"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>

    <v-select
      label="Doctor"
      :items="getDoctors"
      v-model="doctorProp"
      outlined
      prepend-inner-icon="mdi-doctor"
      single
      return-object
      item-text="fullName"
    >
      <template v-slot:item="data">
        {{ data.item.fullName }}
        <v-spacer> </v-spacer>
        <v-rating
          :value="data.item.rating"
          disabled
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          readonly
          small
          single
        ></v-rating>
      </template>
    </v-select>

    <v-select
      :items="availableTimes"
      v-model="timeProp"
      label="Availabe Hours"
      outlined
      prepend-inner-icon="mdi-watch"
    ></v-select>
  </v-form>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  props: ['doctor', 'date', 'time', 'clinic', 'appoType'],
  data() {
    return {
      menu: false,
      tttt: ['13', '15', '17'],
    };
  },

  methods: {
    ...mapActions({
      getDoctorsForSchedulingAction: 'doctors/getDoctorsForSchedulingAction',
    }),

    ...mapMutations('doctors', {
      setDoctors: 'setDoctors',
    }),
  },

  computed: {
    ...mapGetters({
      getDoctors: 'doctors/getDoctors',
    }),

    availableTimes() {
      let x = [];
      for (let i = 10; i < 17; i++) {
        x.push(i + ':00');
        x.push(i + ':30');
      }

      return x;
    },

    doctorProp: {
      get() {
        return this.doctor;
      },
      set(val) {
        this.$emit('doctorChanged', val);
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
  },

  watch: {
    date(value) {
      // // when date is changed reset selected doctors and time
      this.doctorProp = null;
      this.timeProp = '';

      // load new doctors
      this.getDoctorsForSchedulingAction({
        clinicId: this.clinic.id,
        appointmentTypeId: this.appoType.id,
        date: value,
      });
    },

    doctor(value) {
      // when doctors is changed reset selected time
      this.timeProp = '';

      //this.availableTimes = value.availableTimes;
    },
  },

  mounted() {
    // at first no doctors are loadded
    this.setDoctors([]);
  },
};
</script>

<style></style>
