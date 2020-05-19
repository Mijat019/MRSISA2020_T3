<template>
  <v-card class="fill-height">
    <v-card-title>
      <h5>DRUGS :D</h5>
    </v-card-title>
    <v-card-text>
      <v-data-table dense :items="getPrescriptions" :headers="headers">
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
    headers: [{ text: "Drug name", value: "name" }],
    selectedDrug: null
  }),

  computed: {
    ...mapGetters({
      getDrugs: "drugs/getDrugs",
      getPrescriptions: "prescriptions/getPrescriptions"
    })
  },

  methods: {
    ...mapActions({ getDrugsAction: "drugs/getDrugsAction" }),

    ...mapMutations({ addPrescription: "prescriptions/addPrescription" }),

    add() {
      if (!this.selectedDrug) {
        alert("You need to select a drug");
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