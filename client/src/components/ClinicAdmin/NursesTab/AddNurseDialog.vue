<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
    <template v-slot:activator="{on}">
      <v-btn dark class="mb-2" v-on="on">Add nurse</v-btn>
    </template>
    <v-card>
      <v-card-title>Add Nurse</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="nurse.firstName" :rules="rules" label="First name" required></v-text-field>
          <v-text-field v-model="nurse.lastName" :rules="rules" label="Last name" required></v-text-field>
          <v-text-field v-model="nurse.email" :rules="rules" label="E-mail" required></v-text-field>
          <v-text-field v-model="nurse.jmbg" :rules="rules" label="JMBG" required></v-text-field>
          <v-text-field v-model="nurse.city" :rules="rules" label="City" required></v-text-field>
          <v-text-field v-model="nurse.country" :rules="rules" label="Country" required></v-text-field>
          <v-text-field v-model="nurse.address" :rules="rules" label="Address" required></v-text-field>
          <v-text-field v-model="nurse.phoneNumber" :rules="rules" label="Phone number" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addNurse">Add</v-btn>
        <v-btn @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddNurseDialog",
  data: () => ({
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

    nurse: {
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

    defaultNurse: {
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
  }),

  methods: {
    ...mapActions("nurses", {
      addNurseAction: "addNurseAction"
    }),

    async addNurse() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.addNurseAction(this.nurse);
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
