<template>
  <v-card>
    <v-card-title>Drugs</v-card-title>
    <v-card-text>
      <v-data-table :items="getDrugs" :headers="headers">
        <template v-slot:top></template>
        <template v-slot:actions="{ item }">
          <slot name="actions" :drug="item"></slot>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DrugsTable",

  data: () => ({
    headers: [
      { text: "Drug name", value: "name" },
      { text: "Actions", value: "actions" }
    ]
  }),

  methods: {
    ...mapActions({ getDrugsAction: "drugs/getDrugsAction" })
  },

  computed: {
    ...mapGetters({
      getDrugs: "drugs/getDrugs"
    })
  },

  created() {
    this.getDrugsAction();
  }
};
</script>

<style>
</style>