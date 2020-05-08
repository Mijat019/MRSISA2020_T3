<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
    <template v-slot:activator="{on}">
      <v-btn dark class="mb-2" v-on="on">Add clinicCenterAdmin</v-btn>
    </template>
    <v-card>
      <v-card-title>Add a Clinic Center Admin</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="clinicCenterAdmin.firstName"
            :rules="rules"
            label="First name"
            required
          />
          <v-text-field
            v-model="clinicCenterAdmin.lastName"
            :rules="rules"
            label="Last name"
            required
          />
          <v-text-field v-model="clinicCenterAdmin.email" :rules="rules" label="E-mail" required />
          <v-text-field v-model="clinicCenterAdmin.jmbg" :rules="rules" label="JMBG" required />
          <v-text-field v-model="clinicCenterAdmin.city" :rules="rules" label="City" required />
          <v-text-field
            v-model="clinicCenterAdmin.country"
            :rules="rules"
            label="Country"
            required
          />
          <v-text-field
            v-model="clinicCenterAdmin.address"
            :rules="rules"
            label="Address"
            required
          />
          <v-text-field
            v-model="clinicCenterAdmin.phoneNumber"
            :rules="rules"
            label="Phone number"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="addClinicCenterAdmin">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddClinicCenterAdminDialog",
  data: () => ({
    clinicCenterAdmin: {
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
    defaultClinicCenterAdmin: {
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
    ...mapActions("clinicCenterAdmins", {
      addClinicCenterAdminAction: "addClinicCenterAdminAction"
    }),

    async addClinicCenterAdmin() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.addClinicCenterAdminAction(this.clinicCenterAdmin);
      this.close();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.clinicCenterAdmin = Object.assign(
          {},
          this.defaultClinicCenterAdmin
        );
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
