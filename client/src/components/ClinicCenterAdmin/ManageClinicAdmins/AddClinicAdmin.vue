<template>
  <v-dialog v-model="dialog" width="50%">
    <template v-slot:activator="{ on }">
      <v-btn dark class="mb-2" v-on="on">Add clinic admin</v-btn>
    </template>
    <v-card>
      <v-card-title>Add clinic admin</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation v-model="valid">
          <v-row align="center" justify="center" class="pt-3">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="clinicAdmin.firstName"
                :rules="requiredRule"
                outlined
                dense
                label="First Name"
                name="firstName"
                type="text"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="clinicAdmin.lastName"
                :rules="requiredRule"
                outlined
                dense
                label="Last Name"
                name="lastName"
                type="text"
              />
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-text-field
                v-model="clinicAdmin.email"
                :rules="emailRule"
                outlined
                dense
                label="Email"
                name="email"
                type="text"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select required :items="clinicNames" v-model="clinicName" label="Clinic"></v-select>
            </v-col>
          </v-row>
          <v-row align="center" justify="center" class="pt-3">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="clinicAdmin.jmbg"
                :rules="jmbgRule"
                outlined
                dense
                label="JMBG"
                name="jmbg"
                type="text"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="clinicAdmin.phoneNumber"
                :rules="phoneNumRule"
                outlined
                dense
                label="Phone Number"
                name="phoneNumber"
                type="text"
              />
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="clinicAdmin.password"
                :rules="requiredRule"
                outlined
                dense
                id="password"
                label="Password"
                name="password"
                type="password"
              />
            </v-col>

            <!-- ne radi kad dam listu za rules nmp -->
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="confirmed_password"
                :rules="passwordRule"
                outlined
                dense
                id="password2"
                label="Confirm"
                name="password2"
                type="password"
              />
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="clinicAdmin.country"
                :rules="requiredRule"
                outlined
                dense
                label="Country"
                name="country"
                type="text"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="clinicAdmin.city"
                :rules="requiredRule"
                outlined
                dense
                label="City"
                name="city"
                type="text"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="clinicAdmin.address"
                :rules="requiredRule"
                outlined
                dense
                label="Address"
                name="address"
                type="text"
              />
            </v-col>
          </v-row>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      valid: true,
      clinicAdmin: {
        firstName: "",
        lastName: "",
        jmbg: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
        password: ""
      },
      clinicId: null,
      clinicName: "",
      confirmed_password: "",

      // FORM VALIDATION RULES
      requiredRule: [v => !!v || "This field is required"],
      emailRule: [v => !!v || "This field is required"],
      jmbgRule: [
        v => !!v || "This field is required",
        v => !/[a-zA-Z]/.test(v) || "JMBG must not contain letters"
      ],
      passwordRule: [
        v => !!v || "This field is required",
        v => v === this.clinicAdmin.password || "Passwords must match!"
      ],
      phoneNumRule: [
        v => !!v || "This field is required",
        v => !/[a-zA-Z]/.test(v) || "Phone number must not contain letters"
      ]
    };
  },
  methods: {
    ...mapActions("clinicAdmins", {
      addClinicAdminAction: "addClinicAdminAction"
    }),

    async save() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        await this.addClinicAdminAction({
          clinicAdminPayload: this.clinicAdmin,
          clinicId: this.clinicId
        });
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },

    close() {
      this.dialog = false;
    }
  },

  computed: {
    ...mapGetters("clinics", { getClinics: "getClinics" }),
    clinicNames() {
      const clinicNames = this.getClinics.map(clinic => clinic.name);
      return clinicNames;
    }
  },

  watch: {
    clinicName(clinicName) {
      const { id } = this.getClinics.find(clinic => clinic.name === clinicName);
      this.clinicId = id;
    }
  }
};
</script>

<style>
</style>