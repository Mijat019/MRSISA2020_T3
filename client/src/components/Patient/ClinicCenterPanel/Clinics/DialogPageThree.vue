<template>
  <v-container class="mt-5 px-8">
    <v-row class=" headline font-weight-bold px-3 py-3 black--text">
      Appointment Summary:
    </v-row>
    <v-divider></v-divider>
    <v-row class="subtitle-1">
      <v-col cols="6">
        {{ type }} <br>
        {{ name }}
      </v-col>

      <v-col cols="6" class="pr-6">
        <v-row justify="end">USD {{price}}</v-row>
        <v-row justify="end">{{ date }}</v-row>
        <v-row justify="end">{{ time }} (30 mins)</v-row>
      </v-col>
    </v-row>

    <v-row class="mt-10 px-3">
      <v-text-field
        readonly
        value="Email notification will be sent 24 hours before appointment"
        outlined
      >
      <template slot="prepend-inner">
        <v-icon class="pr-2">mdi-email-open-outline</v-icon>
      </template>
      </v-text-field>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['name', 'type', 'price', 'date', 'time'],
};
</script>

<style></style>
