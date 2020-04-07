<template>
  <v-dialog v-model="dialog" width="50%">
    <template v-slot:activator="{ on }">
      <v-btn dark class="mb-2" v-on="on">Add doctor</v-btn>
    </template>
    <v-card>
      <v-card-title>Add doctor</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="doctor.firstName" :rules="rules" label="First name" required></v-text-field>
          <v-text-field v-model="doctor.lastName" :rules="rules" label="Last name" required></v-text-field>
          <v-text-field v-model="doctor.email" :rules="rules" label="E-mail" required></v-text-field>
          <v-text-field v-model="doctor.jmbg" :rules="rules" label="JMBG" required></v-text-field>
          <v-text-field v-model="doctor.city" :rules="rules" label="City" required></v-text-field>
          <v-text-field v-model="doctor.country" :rules="rules" label="Country" required></v-text-field>
          <v-text-field v-model="doctor.address" :rules="rules" label="Address" required></v-text-field>
          <v-text-field v-model="doctor.phoneNumber" :rules="rules" label="Phone number" required></v-text-field>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
//import config from "../../../config";
//import axios from "axios";
//import urlencode from "urlencode";

export default {
  name: "DoctorDialog",
  data: () => ({
    doctor: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      jmbg: "",
      city: "",
      country: "",
      address: "",
      phoneNumber: ""
    },
    dialog: false,
    rules: [
      v => !!v || "This field is required",
      v =>
        (v && v.length <= 255) ||
        "This field can't be longer than 255 characters"
    ],
    lengthRules: [
      v => v.length <= 255 || "This field can't be longer than 255 characters"
    ],

    addressList: [],
    searchAddress: null,
    isLoading: false
  }),

  methods: {
    ...mapActions("doctors", {
      addDoctorAction: "addDoctorAction"
    }),

    async save() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.addDoctorAction(this.doctor);
      this.close();
    },

    close() {
      this.doctor = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        jmbg: "",
        city: "",
        country: "",
        address: "",
        phoneNumber: ""
      }
      this.dialog = false;
    }
  }
};
</script>

<style></style>
