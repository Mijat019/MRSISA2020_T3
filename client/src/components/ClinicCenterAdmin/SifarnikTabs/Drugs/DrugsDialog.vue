<template>
  <v-dialog max-width="50%" v-model="getShowDialog" @click:outside="closeDialog">
    <v-card>
      <v-card-title v-if="getDialogType === `add`">Add a new drug</v-card-title>
      <v-card-title v-else>Edit this drug</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="getDialogDrug.name" :rules="rules" label="Name" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn v-if="getDialogType === 'add'" color="primary" @click="addDrug">Add</v-btn>
        <v-btn v-else color="primary" @click="updateDrug">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "DrugsDialog",

  data: () => ({
    rules: [
      v => !!v || "This field is required",
      v =>
        (v && v.length <= 255) ||
        "This field can't be longer than 255 characters"
    ]
  }),

  methods: {
    ...mapActions("drugs", {
      addDrugAction: "addDrugAction",
      updateDrugAction: "updateDrugAction"
    }),
    ...mapMutations("drugsDialog", {
      closeDialog: "closeDialog"
    }),

    async addDrug() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.addDrugAction(this.getDialogDrug);
      this.closeDialog();
    },

    async updateDrug() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.updateDrugAction(this.getDialogDrug);
      this.closeDialog();
    }
  },

  computed: {
    ...mapGetters("drugsDialog", {
      getShowDialog: "getShowDialog",
      getDialogDrug: "getDialogDrug",
      getDialogType: "getDialogType"
    })
  }
};
</script>

<style>
</style>