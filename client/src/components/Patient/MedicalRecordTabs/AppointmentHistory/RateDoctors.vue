<template>
  <v-dialog v-model="dialog" width="700px" @click:outside="close">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" :disabled="disableBtn" class="mx-5 cyan lighten-3" small
        >Rate Doctor</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="justify-center mb-6">
        <div class="headline">{{ item.firstName }} {{ item.lastName }}</div>
      </v-card-title>
      <v-card-text>
        <RatingComponent
          class="ma-3"
          :rating="communicationRating"
          @ratingChanged="communicationRating = $event"
          title="Communication"
          description="How well did he explain your condition?"
          icon="clarity:talk-bubbles-outline-badged"
        />
        <RatingComponent
          class="ma-3"
          :rating="expertiseRating"
          @ratingChanged="expertiseRating = $event"
          title="Expertise"
          description="How do you feel about the doctor's expertise?"
          icon="medical-icon:i-surgery"
        />
        <RatingComponent
          class="ma-3"
          :rating="timeRating"
          @ratingChanged="timeRating = $event"
          title="Time well spent"
          description="How productive was your session?"
          icon="ant-design:field-time-outlined"
        />
        <v-row class="mt-6 mx-6">
          <v-textarea
            v-model="comment"
            rows="3"
            filled
            placeholder="Share details of your experience with this doctor"
          ></v-textarea>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row class="mx-3 mb-3">
          <v-spacer></v-spacer>
          <v-btn @click="close" class="white blue--text">Cancel</v-btn>
          <v-btn @click="rate" class="mx-6 blue white--text">Rate Doctor</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { bus } from '@/main';
import RatingComponent from './RatingComponent';

export default {
  props: ['item', 'disableBtn'],
  components: {
    RatingComponent,
  },
  data: () => ({
    dialog: '',
    communicationRating: 0,
    timeRating: 0,
    expertiseRating: 0,
    comment: '',
  }),

  methods: {
    ...mapActions('ratings', {
      submitDoctorRatingAction: 'submitDoctorRatingAction',
      getAlreadyRatedAction: 'getAlreadyRatedAction',
    }),

    async rate() {
      const avg =
        (this.communicationRating + this.timeRating + this.expertiseRating) / 3;

      const payload = {
        patientId: this.user.id,
        doctorId: this.item.id,
        communicationRating: this.communicationRating,
        expertiseRating: this.expertiseRating,
        timeRating: this.timeRating,
        averageRating: avg,
        comment: this.comment,
      };

      await this.submitDoctorRatingAction(payload);
      this.getAlreadyRated.doctors.push({doctorId: this.item.id});
      bus.$emit('ratingChanged');
      this.reset();
      this.close();
    },

    reset() {
      this.communicationRating = 0;
      this.timeRating = 0;
      this.expertiseRating = 0;
      this.comment = '';
    },

    close() {
      this.dialog = false;
    },
  },

  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      getAlreadyRated: 'ratings/getAlreadyRated',
    }),
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
