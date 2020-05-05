<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
    <v-card>
      <v-card-title v-if="type === 'add'"
        >Add New Appointment Type</v-card-title
      >
      <v-card-title v-else>Edit Appointment Type</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="appointmentType.name"
            :rules="rules"
            label="Name"
          ></v-text-field>
          <v-text-field
            v-model="appointmentType.price"
            type="number"
            :rules="rules"
            label="Price"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn v-if="type === 'edit'" color="red" @click="deleteType">Delete</v-btn> -->
        <v-btn @click="close">Cancel</v-btn>
        <v-btn v-if="type === 'add'" color="primary" @click="addType"
          >Add</v-btn
        >
        <v-btn v-else color="primary" @click="updateType">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "AppointmentTypeDialog",
  data: () => ({
    rules: [(v) => !!v || "This field is required"],
    addressList: [],
    searchAddress: null,
    isLoading: false,
  }),

  methods: {
    ...mapActions("appointmentTypes", {
      addAppointmentTypeAction: "addAppointmentTypeAction",
      deleteAppointmentTypeAction: "deleteAppointmentTypeAction",
      updateAppointmentTypeAction: "updateAppointmentTypeAction",
    }),

    ...mapMutations("appointmentTypesDialog", {
      close: "closeDialog",
    }),

    async addType() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.addAppointmentTypeAction(this.appointmentType);
      this.close();
    },

    async deleteType() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.deleteAppointmentTypeAction(this.appointmentType);
      this.close();
    },

    async updateType() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.updateAppointmentTypeAction(this.appointmentType);
      this.close();
    },
  },

  computed: {
    ...mapGetters("appointmentTypesDialog", {
      dialog: "getShowDialog",
      appointmentType: "getDialogAppointmentType",
      type: "getDialogType",
    }),
  },
};
</script>

<style></style>
