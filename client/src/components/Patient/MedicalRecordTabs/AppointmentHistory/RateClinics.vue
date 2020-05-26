<template>
  <v-dialog v-model="dialog" width="700px" @click:outside="close">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="teal lighten-3" small>Rate Clinic</v-btn>
    </template>
    <v-card>
      <v-card-title class="justify-center mb-6">
        <p>{{item.name}}</p>
      </v-card-title>
      <v-card-text>
        <RatingComponent
          class="ma-3"
          :rating="ratingService"
          title="Service"
          description="Did employees treat you well?"
          icon="carbon:service-desk"
        />
        <RatingComponent
          class="ma-3"
          :rating="ratingCleanliness"
          title="Cleanliness"
          description="Was the cleanliness up to your standards?"
          icon="carbon:clean"
        />
        <RatingComponent
          class="ma-3"
          :rating="ratingTime"
          title="Time well spent"
          description="Did you find your visit successful?"
          icon="ant-design:field-time-outlined"
        />
        <v-row class="mt-6 mx-6">
          <v-textarea
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

export default {
  props: ['item'],
  components: {
    RatingComponent,
  },
  data: () => ({
    dialog: '',
    ratingService: 0,
    ratingCleanliness: 0,
    ratingExpertise: 0,
  }),
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
