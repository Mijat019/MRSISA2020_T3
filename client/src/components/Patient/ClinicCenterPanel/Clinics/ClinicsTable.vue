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

      <v-select
        class="mx-12 selectInput"
        item-text="name"
        :items="appointmentTypes"
        v-model="appointmentType"
        menu-props="auto"
        label="Appointment type"
        hide-details
        single-line
        return-object
      ></v-select>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="clinics"
        :search="search"
        @click:row="rowClicked"
      >
        <template v-slot:top>
          <slot name="top"> </slot>
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

        <template v-slot:item.price="{ item }">
          {{ getPriceListFromClinic(item).price }}
        </template>
      </v-data-table>
    </v-card-text>
    <ScheduleDialog />
  </v-card>
</template>

<script>
import { bus } from '../../../../main';
import ScheduleDialog from './ScheduleDialog';

import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  name: 'ClinicsTable',
  components: {
    ScheduleDialog,
  },
  data() {
    return {
      search: '',
      clickedClinic: '',
      appointmentType: { id: '' },
      headers: [
        {
          text: 'Name',
          value: 'name',
          align: 'center',
        },
        {
          text: 'Country',
          value: 'country',
          align: 'center',
        },
        {
          text: 'City',
          value: 'city',
          align: 'center',
        },
        {
          text: 'Address',
          value: 'address',
          align: 'center',
        },
        {
          text: 'Appointment Price',
          value: 'price',
          align: 'center',
        },
        {
          text: 'Clinic Rating',
          value: 'rating',
          align: 'center',
        },
      ],
    };
  },

  async mounted() {
    this.setClinics([]);
    await this.getAppointmentTypesAction();
    await this.getPriceListsAction();
  },

  methods: {
    ...mapActions({
      getClinicsForAppoType: 'clinics/getClinicsForAppoType',
      getAppointmentTypesAction: 'appointmentTypes/getAppointmentTypesAction',
      getPriceListsAction: 'priceLists/getPriceListsAction',
    }),

    ...mapMutations('clinics', {
      setClinics: 'setClinics',
    }),

    async rowClicked(value) {
      const data = {
        'clinic' : value,
        'appoType': this.appointmentType,
        'priceList' : this.getPriceListFromClinic(value)
      };
      bus.$emit('clinicChosen', data);
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
  },

  computed: {
    ...mapGetters({
      clinics: 'clinics/getClinics',
      appointmentTypes: 'appointmentTypes/getAppointmentTypes',
      priceLists: 'priceLists/getPriceLists',
    }),
  },

  watch: {
    async appointmentType(value) {
      await this.getClinicsForAppoType(value.id);
      for (let clinic of this.clinics) {
        await this.getPriceListsAction(clinic.id);
      }
    },
  },
};
</script>

<style>
.searchInput {
  max-width: 500px !important;
}

.selectInput {
  max-width: 250px !important;
}

table>tbody>tr {
  cursor: pointer;
}
</style>
