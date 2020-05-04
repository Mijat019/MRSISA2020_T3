<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-icon small v-on="on">mdi-delete</v-icon>
    </template>
    <v-card>
      <v-card-title class="headline">Are you sure you want to delete this doctor?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">no</v-btn>
        <v-btn color="error" text @click="deleteDoctor">yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DeleteDoctorDialog",
  props: ["doctorId"],
  data: () => ({
    dialog: false
  }),

  methods: {
    ...mapActions("doctors", {
      deleteDoctorAction: "deleteDoctorAction"
    }),

    deleteDoctor() {
      this.deleteDoctorAction(this.doctorId);
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>