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
          <v-row>
            <v-col>
              <v-text-field v-model="clinic.city" :rules="rules" label="City"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="clinic.street" :rules="rules" label="Street"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="clinic.streetNumber" :rules="rules" label="Street number"></v-text-field>
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
import { mapActions } from "vuex";

export default {
  name: "AddClinic",
  data: () => ({
    clinic: {
      name: "",
      description: "",
      street: "",
      city: "",
      streetNumber: ""
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
    ]
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
  }
};
</script>

<style></style>
