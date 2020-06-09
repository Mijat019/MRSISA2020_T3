<template>
  <v-container>
    <!-- Appointment type: {{ dialogAppo.priceList.appointmentType.name }}
    <br />
    Doctor: {{ dialogAppo.doctor.user.firstName }}
    {{ dialogAppo.doctor.user.lastName }}
    <br />
    Room: {{ dialogAppo.room.name }}
    <br />
    Time: {{ appointmentTime }} -->
    <v-row class=" headline font-weight-bold px-3 py-3 black--text">
      Appointment Summary:
    </v-row>
    <v-divider></v-divider>
    <v-row class="subtitle-1">
      <v-col cols="6">
        {{ appoType }} <br />
        {{ doctor }} <br>
        {{ clinic }}
      </v-col>

      <v-col cols="6" class="pr-6">
        <v-row justify="end">USD {{ price }}</v-row>
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
  props: ['appoType', 'doctor', 'room', 'time', 'date', 'price', 'clinic'],

};
</script>

<style></style>
