<template>
  <v-dialog v-model="dialog" fullscreen>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">Schedule another appointment</v-btn>
    </template>

    <v-card>
      <v-card-title>
        fsdafd
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <CalendarTab />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CalendarTab from "../CalendarTab.vue";
export default {
  components: { CalendarTab },

  name: "ScheduleAnotherAppointment",

  data: () => ({
    dialog: false
  })
};
</script>

<style>
</style>