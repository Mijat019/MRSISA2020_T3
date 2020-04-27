<template>
  <v-card>
    <v-card-title>
      Patient registration requests
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="getPatientRequests" :search="search">
      <template v-slot:item.actions="{item}">
        <div>
          <v-btn @click="approve(item)" color="success" small>Approve</v-btn>
          {{" "}}
          <v-btn @click="reject(item)" color="error" small>reject</v-btn>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ManagePatientsRequests",

  data: () => ({
    search: "",
    headers: [
      { text: "Email", value: "email" },
      { text: "First name", value: "firstName" },
      { text: "Last name", value: "lastName" },
      { text: "Jmbg", value: "jmbg" },
      { text: "City", value: "city" },
      { text: "Country", value: "country" },
      { text: "Address", value: "address" },
      { text: "Phone number", value: "phoneNumber" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),

  methods: {
    ...mapActions("patientRequests", {
      getPatientRequestsAction: "getPatientRequestsAction",
      confirmPatientRequestAction: "confirmPatientRequestAction"
    }),

    approve(item) {
      this.confirmPatientRequestAction(item.email);
    },

    reject(item) {
      alert(item.email);
    }
  },
  async created() {
    await this.getPatientRequestsAction();
  },

  computed: {
    ...mapGetters("patientRequests", {
      getPatientRequests: "getPatientRequests"
    })
  }
};
</script>

<style>
</style>