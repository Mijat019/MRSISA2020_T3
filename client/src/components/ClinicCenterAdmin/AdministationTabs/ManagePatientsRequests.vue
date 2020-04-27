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
          <!-- @click="reject(item)" -->
          <v-btn @click="approve(item)" color="success" small>Approve</v-btn>
          {{" "}}
          <v-dialog v-model="dialog">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="error" small>reject</v-btn>
            </template>
            <v-card>
              <v-card-title>Why are you rejecting?</v-card-title>
              <v-card-text>
                <v-textarea hint="Reason" v-model="reason"></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="cancel">Cancel</v-btn>
                <v-btn @click="reject(item)" color="error">Reject</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
    dialog: false,
    reason: "",
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
      confirmPatientRequestAction: "confirmPatientRequestAction",
      rejectPatientRequestAction: "rejectPatientRequestAction"
    }),

    approve(item) {
      this.confirmPatientRequestAction(item.email);
    },

    reject(item) {
      this.rejectPatientRequestAction({
        email: item.email,
        reason: this.reason
      });
      this.reason = "";
    },
    cancel() {
      this.reason = "";
      this.dialog = false;
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