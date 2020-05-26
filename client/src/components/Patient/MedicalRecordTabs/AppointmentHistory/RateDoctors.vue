<template>
  <v-dialog v-model="dialog" width="700px" @click:outside="close">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="mx-5 cyan lighten-3" small>Rate Doctor</v-btn>
    </template>
    <v-card>
      <v-card-title class="justify-center mb-6">
        <div class="headline">{{ item.firstName }} {{ item.lastName }}</div>
      </v-card-title>
      <v-card-text>
        <RatingComponent
          class="ma-3"
          :rating="ratingCommunication"
          title="Communication"
          description="How well did he explain your condition?"
          icon="clarity:talk-bubbles-outline-badged"
        />
        <RatingComponent
          class="ma-3"
          :rating="ratingExpertise"
          title="Expertise"
          description="How do you feel about the doctor's expertise?"
          icon="medical-icon:i-surgery"
        />
        <RatingComponent
          class="ma-3"
          :rating="ratingTime"
          title="Time well spent"
          description="How productive was your session?"
          icon="ant-design:field-time-outlined"
        />
        <v-row class="mt-6 mx-6">
          <v-textarea
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
          <v-btn @click="rate(item)" class="mx-6 blue white--text"
            >Rate Doctor</v-btn
          >
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import RatingComponent from './RatingComponent';

export default {
  components: {
    RatingComponent,
  },
  data: () => ({
    reason: '',
    dialog: '',
    ratingCommunication: 0,
    ratingTime: 0,
    ratingExpertise: 0,
  }),
  props: ['item'],
  methods: {
    rate(item) {
      console.log(item);
      alert('Not implemented');
    },

    close() {
      this.dialog = '';
    },
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
