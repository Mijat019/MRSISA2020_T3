<template>
  <v-row>
    <v-col cols="1">
      <span class="iconify" :data-icon="icon"></span>
    </v-col>

    <v-col cols="6">
      <div class="black--text">{{title}}</div>
      <div>{{description}}</div>
    </v-col>
    
    <v-col cols="5" align="end" >
      <v-rating
        v-model="ratingProp"
        color="yellow darken-3"
        background-color="grey darken-1"
        empty-icon="$ratingFull"
        half-increments
        hover
      ></v-rating>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["icon", "title", "description", "rating"],

  computed: {
    ratingProp: {
      get() {
        return this.rating;
      },
      set(val){
        this.$emit('ratingChanged', val);
      }
    }
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

