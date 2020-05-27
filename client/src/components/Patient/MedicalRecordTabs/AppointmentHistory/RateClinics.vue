<template>
  <v-dialog v-model="dialog" width="700px" @click:outside="close">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="teal lighten-3" small>Rate Clinic</v-btn>
    </template>
    <v-card>
      <v-card-title class="justify-center">
        <div class="headline">{{ item.name }}</div>
        <br />
      </v-card-title>
      <v-card-text>
        <div class="text-center mb-6 subtitle-1">
          {{ item.address }}, {{ item.city }}
        </div>
        <RatingComponent
          class="ma-3"
          :rating="serviceRating"
          @ratingChanged="serviceRating = $event"
          title="Service"
          description="Did employees treat you well?"
          icon="carbon:service-desk"
        />
        <RatingComponent
          class="ma-3"
          :rating="cleanlinessRating"
          @ratingChanged="cleanlinessRating = $event"
          title="Cleanliness"
          description="Was the cleanliness up to your standards?"
          icon="carbon:clean"
        />
        <RatingComponent
          class="ma-3"
          :rating="timeRating"
          @ratingChanged="timeRating = $event"
          title="Time well spent"
          description="Did you find your visit successful?"
          icon="ant-design:field-time-outlined"
        />
        <v-row class="mt-6 mx-6">
          <v-textarea
            v-model="comment"
            rows="3"
            filled
            placeholder="Share details of your experience with this clinic"
          ></v-textarea>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row class="mx-3 mb-3">
          <v-spacer></v-spacer>
          <v-btn @click="close" class="white blue--text">Cancel</v-btn>
          <v-btn @click="rate(item)" class="mx-6 blue white--text"
            >Rate Clinic</v-btn
          >
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import RatingComponent from './RatingComponent';
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['item'],
  components: {
    RatingComponent,
  },
  data: () => ({
    dialog: '',
    serviceRating: 0,
    cleanlinessRating: 0,
    timeRating: 0,
    comment: '',
  }),

  methods: {
    ...mapActions('ratings', {
      submitClinicRatingAction: 'submitClinicRatingAction',
    }),

    async rate() {
      const avg =
        (this.serviceRating + this.cleanlinessRating + this.timeRating) / 3;

      const payload = {
        patientId: this.user.id,
        clinicId: this.item.id,
        serviceRating: this.serviceRating,
        cleanlinessRating: this.cleanlinessRating,
        timeRating: this.timeRating,
        averageRating: avg,
        comment: this.comment,
      };

      await this.submitClinicRatingAction(payload);
      this.reset();
      this.close();
    },

    reset() {
      this.serviceRating = 0;
      this.cleanlinessRating = 0;
      this.timeRating = 0;
      this.comment = '';
    },

    close() {
      this.dialog = false;
    },
  },

  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
  },
};
</script>

<style scoped>
.iconify {
  width: 40px;
  height: 40px;
  background-color: rgb(219, 219, 219);
  border-radius: 10px;
}
</style>
