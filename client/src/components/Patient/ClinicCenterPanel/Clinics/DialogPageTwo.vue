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
          v-model="date"
          label="Date"
          prepend-inner-icon="mdi-calendar"
          readonly
          outlined
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker no-title v-model="date" @input="menu = false"></v-date-picker>
    </v-menu>

    <v-select
      label="Doctor"
      readonly
      outlined
      prepend-inner-icon="mdi-doctor"
    ></v-select>

    <v-select
      label="Availabe Hours"
      readonly
      outlined
      prepend-inner-icon="mdi-watch"
    ></v-select>
  </v-form>
</template>

<script>
export default {
  props: ['doctors'],
  data() {
    return {
      date: null,
      menu: false,
    };
  },
};
</script>

<style></style>
