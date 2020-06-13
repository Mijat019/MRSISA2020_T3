<template>
  <v-card>
    <v-card-title class="mx-8 mb-12 mt-5">
      Clinics
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        prepend-icon="mdi-magnify"
        label="Search"
        class="searchInput"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="doctors"
        :search="search"
        @click:row="rowClicked"
      >
        <template v-slot:top>
          <slot name="top"> </slot>
        </template>

        <template v-slot:item.spec="{ item }">
          {{ generateSpecForDoctor(item) }}
        </template>

        <template v-slot:item.rating="{ item }">
          <v-rating
            :value="item.rating"
            disabled
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            readonly
          ></v-rating>
        </template>
      </v-data-table>
    </v-card-text>
    <DoctorScheduleDialog />
  </v-card>
</template>

<script>
import { bus } from '../../../../main';
import DoctorScheduleDialog from './DoctorScheduleDialog'
import moment from 'moment'

import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  name: 'DoctorsTable',
  components: {
    DoctorScheduleDialog,
  },
  data() {
    return {
      search: '',
      clickedClinic: '',
      appointmentType: { id: '' },
      headers: [
        {
          text: 'Name',
          value: 'fullName',
          align: 'center',
        },
        {
          text: 'Email',
          value: 'user.email',
          align: 'center',
        },
        {
          text: 'Clinic',
          value: 'clinic.name',
          align: 'center',
        },
        {
          text: 'Specializations',
          value: 'spec',
          align: 'center',
        },
        {
          text: 'Rating',
          value: 'rating',
          align: 'center',
        },
      ],
    };
  },

  async mounted() {
    await this.getDoctorsAction();
  },

  methods: {
    ...mapActions({
      getAvailableTimesAction: 'doctors/getAvailableTimesAction',
      getDoctorsAction: 'doctors/getDoctorsAction',
      getClinicsForAppoType: 'clinics/getClinicsForAppoType',
      getAppointmentTypesAction: 'appointmentTypes/getAppointmentTypesAction',
      getPriceListsAction: 'priceLists/getPriceListsAction',
    }),

    ...mapMutations('clinics', {
      setClinics: 'setClinics',
    }),

    async rowClicked(value) {
      bus.$emit('doctorChosen', value);
    },

    getPriceListFromClinic(clinic) {
      if (!clinic || this.priceLists.length == 0) return 0;

      let x = this.priceLists.filter(
        priceList =>
          priceList.appointmentTypeId == this.appointmentType.id &&
          priceList.clinicId == clinic.id
      )[0];
      return x ? x : {};
    },

    generateSpecForDoctor(item){
      if (item.spec)
        return item.spec.map(spec => spec.appoType.name).join(', ');
      return '';
    }
  },

  computed: {
    ...mapGetters({
      doctors: 'doctors/getDoctors',
      clinics: 'clinics/getClinics',
      appointmentTypes: 'appointmentTypes/getAppointmentTypes',
      priceLists: 'priceLists/getPriceLists',
    }),
  },

  watch: {
  },
};
</script>

<style>

</style>
