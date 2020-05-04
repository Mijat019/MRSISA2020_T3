<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
    <template v-slot:activator="{on}">
      <v-btn dark class="mb-2" v-on="on">Add doctor</v-btn>
    </template>
    <v-card>
      <v-card-title>Add Doctor</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="doctor.firstName" :rules="rules" label="First name" required />
          <v-text-field v-model="doctor.lastName" :rules="rules" label="Last name" required />
          <v-text-field v-model="doctor.email" :rules="rules" label="E-mail" required />
          <v-text-field v-model="doctor.jmbg" :rules="rules" label="JMBG" required />
          <v-text-field v-model="doctor.city" :rules="rules" label="City" required />
          <v-text-field v-model="doctor.country" :rules="rules" label="Country" required />
          <v-text-field v-model="doctor.address" :rules="rules" label="Address" required />
          <v-text-field v-model="doctor.phoneNumber" :rules="rules" label="Phone number" required />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addDoctor">Add</v-btn>
        <v-btn @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddDoctorDialog",
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
    defaultDoctor: {
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
    rules: [
      v => !!v || "This field is required",
      v =>
        (v && v.length <= 255) ||
        "This field can't be longer than 255 characters"
    ],
    lengthRules: [
      v => v.length <= 255 || "This field can't be longer than 255 characters"
    ],
    dialog: false
  }),

  methods: {
    ...mapActions("doctors", {
      addDoctorAction: "addDoctorAction"
    }),

    async addDoctor() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.addDoctorAction(this.doctor);
      this.close();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.doctor = Object.assign({}, this.defaultDoctor);
      });
    }
  },

  watch: {
    dialog(val) {
      // if val is false, this.close() gets called
      val || this.close();
    }
  }
};
</script>

<style></style>
