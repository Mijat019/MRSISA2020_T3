<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h3>Average rating of your clinic</h3>
        <v-rating
          small
          :value="getClinicRating"
          disabled
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          readonly
        ></v-rating>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col>
        <v-card elevation="0">
          <v-card-title>Doctor ratings</v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="getDoctors">
              <template v-slot:item.rating="{ item }">
                <v-rating
                  small
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
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dates"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dates"
              label="Date interval"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dates" range no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="show">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <AppointmentGraph :dates="dates2" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppointmentGraph from './AppointmentGraph.vue';
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
export default {
  components: { AppointmentGraph },

  name: 'BusinessReport',

  data: () => ({
    menu: false,
    dates: [],
    dates2: [moment().startOf('week'), moment().endOf('week')],
    headers: [
      { text: 'First name', value: 'user.firstName' },
      { text: 'Last name', value: 'user.lastName' },
      { text: 'Rating', value: 'rating', align: 'center' },
    ],
  }),

  computed: {
    ...mapGetters({
      getClinicRating: 'ratings/getClinicRating',
      getDoctors: 'doctors/getDoctors',
      getUser: 'authentication/getUser',
    }),
  },

  methods: {
    ...mapActions({
      getClinicRatingAction: 'ratings/getClinicRatingAction',
      getDoctorsAction: 'doctors/getDoctorsAction',
    }),

    show() {
      this.dates2 = [...this.dates];
      this.menu = false;
    },
  },

  mounted() {
    this.getClinicRatingAction();
    this.getDoctorsAction(this.getUser.clinicId);
  },
};
</script>

<style></style>
