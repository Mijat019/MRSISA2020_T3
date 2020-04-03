<template>
  <v-dialog v-model="dialog" width="50%">
    <template v-slot:activator="{ on }">
      <v-btn dark class="mb-2" v-on="on">Add clinic</v-btn>
    </template>
    <v-card>
      <v-card-title>Add clinic</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="clinic.name" :rules="rules" label="Name" required></v-text-field>
          <v-text-field v-model="clinic.description" :rules="lengthRules" label="Description"></v-text-field>
          <v-text-field v-model="clinic.address" :rules="rules" label="Address"></v-text-field>

          <!-- <v-autocomplete
            v-model="clinic.address"
            label="Street"
            :items="addressList"
            item-text="display_name"
            :search-input.sync="searchAddress"
            allow-overflow
          ></v-autocomplete>-->
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
import config from "../../../config";
import axios from "axios";
import urlencode from "urlencode";

export default {
  name: "AddClinic",
  data: () => ({
    clinic: {
      name: "",
      description: "",
      address: "",
      lat: null,
      lon: null
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
    ...mapActions("clinics", {
      addClinicAction: "addClinicAction"
    }),

    async save() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.addClinicAction(this.clinic);
      this.close();
    },

    close() {
      this.clinic.name = "";
      this.clinic.description = "";
      this.clinic.address = "";
      this.dialog = false;
    }
  },

  watch: {
    async searchAddress(newValue) {
      if (this.isLoading) {
        return;
      }

      if (!newValue) {
        this.addressList = [];
        return;
      }

      this.isLoading = true;
      const query = urlencode(newValue);
      const { data } = await axios.get(
        `http://localhost:8080/v1/search.php?key=${config.apiKey}&country=Serbia&city=Novi%20Sad&street=${query}&format=json&limit=50`
      );
      console.log(data);
      this.addressList = data;
      this.isLoading = false;
    }
  }
};
</script>

<style></style>
