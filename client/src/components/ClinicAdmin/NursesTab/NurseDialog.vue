<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
    <v-card>
      <v-card-title v-if="type === 'add'">Add Nurse</v-card-title>
      <v-card-title v-else>Edit Nurse</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="nurse.firstName" :rules="rules" label="First name" required></v-text-field>
          <v-text-field v-model="nurse.lastName" :rules="rules" label="Last name" required></v-text-field>
          <v-text-field :disabled="type === 'edit'" v-model="nurse.email" :rules="rules" label="E-mail" required></v-text-field>
          <v-text-field :disabled="type === 'edit'" v-model="nurse.jmbg" :rules="rules" label="JMBG" required></v-text-field>
          <v-text-field v-model="nurse.city" :rules="rules" label="City" required></v-text-field>
          <v-text-field v-model="nurse.country" :rules="rules" label="Country" required></v-text-field>
          <v-text-field v-model="nurse.address" :rules="rules" label="Address" required></v-text-field>
          <v-text-field v-model="nurse.phoneNumber" :rules="rules" label="Phone number" required></v-text-field>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="type === 'edit'" color="red" @click="deleteNurse">Delete</v-btn>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn v-if="type === 'add'" color="primary" @click="addNurse">Add</v-btn>
        <v-btn v-else color="primary" @click="updateNurse">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "NurseDialog",
  data: () => ({
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
    ...mapActions("nurses", {
      addNurseAction: "addNurseAction",
      deleteNurseAction: "deleteNurseAction",
      updateNurseAction: "updateNurseAction"
    }),

    ...mapMutations("nurses", {
      close: "closeDialog"
    }),

    async addNurse() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.addNurseAction(this.nurse);
      this.close();
    },

    async deleteNurse() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.deleteNurseAction(this.nurse);
      this.close();
    },

    async updateNurse() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.updateNurseAction(this.nurse);
      this.close();
    }
  },

  computed: {
    ...mapGetters("nurses", {
        dialog: "getShowDialog",
        nurse: "getDialogNurse",
        type: "getDialogType"
    })
  }
};
</script>

<style></style>
