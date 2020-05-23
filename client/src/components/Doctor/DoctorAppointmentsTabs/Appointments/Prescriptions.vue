<template>
  <v-card class="fill-height">
    <v-card-title>
      <h5>DRUGS :D</h5>
    </v-card-title>
    <v-card-text>
      <v-data-table dense :items="getPrescriptions" :headers="headers" key="index">
        <template v-slot:top>
          <v-dialog max-width="50%" v-model="dialog">
            <template v-slot:activator="{ on }">
              <v-btn small dark v-on="on">Add prescription</v-btn>
            </template>

            <v-card>
              <v-card-title>Select a drug</v-card-title>
              <v-card-text>
                <v-form>
                  <v-select v-model="selectedDrug" :items="getDrugs" item-text="name" return-object></v-select>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="add" color="primary">Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:item.actions="{item}">
          <v-icon small @click="removePrescription(item)">mdi-close</v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Prescriptions",

  data: () => ({
    dialog: false,
    headers: [
      { text: "Drug name", value: "name" },
      { text: "Actions", value: "actions" }
    ],
    selectedDrug: null
  }),

  computed: {
    ...mapGetters({
      getDrugs: "drugs/getDrugs",
      getPrescriptions: "prescriptions/getPrescriptions"
    })
  },

  methods: {
    ...mapActions({
      getDrugsAction: "drugs/getDrugsAction",

      showError: "snackbar/showError"
    }),

    ...mapMutations({
      addPrescription: "prescriptions/addPrescription",
      removePrescription: "prescriptions/removePrescription"
    }),

    add() {
      if (!this.selectedDrug) {
        this.showError("You need to select a drug");
        return;
      }

      if (this.getPrescriptions.includes(this.selectedDrug)) {
        this.showError("You've already added this drug.");
        return;
      }

      this.addPrescription(this.selectedDrug);
      this.selectedDrug = null;
      this.dialog = false;
    }
  },

  created() {
    this.getDrugsAction();
  }
};
</script>

<style>
</style>