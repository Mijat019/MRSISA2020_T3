<template>
  <v-card>
    <v-card-title>
      Clinics
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="getClinics" :search="search">
      <template v-slot:top>
        <slot name="addClinic"></slot>
      </template>

      <template v-slot:item.actions="{ item }">
        <slot name="actions" :item="item"></slot>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ManageClinics",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Address",
          value: "address"
        },
        {
          text: "Description",
          value: "description"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ]
    };
  },

  methods: {
    ...mapActions("clinics", {
      getClinicsAction: "getClinicsAction"
    })
  },

  async mounted() {
    await this.getClinicsAction();
  },

  computed: {
    ...mapGetters("clinics", {
      getClinics: "getClinics"
    })
  }
};
</script>

<style></style>
