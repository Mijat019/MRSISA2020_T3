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
    <v-row>
      <v-col>
        <v-card>
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
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'BusinessReport',

  data: () => ({
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
  },

  mounted() {
    this.getClinicRatingAction();
    this.getDoctorsAction(this.getUser.clinicId);
  },
};
</script>

<style></style>
