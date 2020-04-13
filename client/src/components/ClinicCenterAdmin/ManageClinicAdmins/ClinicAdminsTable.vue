<template>
  <v-card>
    <v-card-title>
      Clinic admins
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="getClinicAdmins" :search="search">
      <template v-slot:top>
        <slot name="addClinicAdmin"></slot>
      </template>
    </v-data-table>
  </v-card>
</template> 

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ClinicAdminsTable",
  data: () => ({
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
        text: "Clinic",
        value: "clinic"
      }
    ]
  }),
  methods: {
    ...mapActions("clinicAdmins", {
      getClinicAdminsAction: "getClinicAdminsAction"
    })
  },
  async mounted() {
    await this.getClinicAdminsAction();
  },
  computed: {
    ...mapGetters("clinicAdmins", { getClinicAdmins: "getClinicAdmins" })
  }
};
</script>

<style>
</style>