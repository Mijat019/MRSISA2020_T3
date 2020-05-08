<template>
  <v-card>
    <v-card-title>
      ClinicCenterAdmins
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="getClinicCenterAdmins" :search="search">
        <template v-slot:top>
          <slot name="top"></slot>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ClinicCenterAdminsTable",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "First name",
          value: "firstName"
        },
        {
          text: "Last name",
          value: "lastName"
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "City",
          value: "city"
        }
      ]
    };
  },

  methods: {
    ...mapActions("clinicCenterAdmins", {
      getClinicCenterAdminsAction: "getClinicCenterAdminsAction"
    })
  },

  async created() {
    await this.getClinicCenterAdminsAction();
  },

  computed: {
    ...mapGetters("clinicCenterAdmins", {
      getClinicCenterAdmins: "getClinicCenterAdmins"
    })
  }
};
</script>

<style>
</style>