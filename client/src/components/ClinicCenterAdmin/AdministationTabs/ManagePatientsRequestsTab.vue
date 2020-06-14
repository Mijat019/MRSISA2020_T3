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
    <v-data-table
      :headers="headers"
      :items="getPatientRequests"
      :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <div>
          <v-btn @click="approve(item)" color="success" small>Approve</v-btn>
          {{ ' ' }}
          <v-btn @click="openDialog(item)" color="error" small>Reject</v-btn>
        </div>
      </template>
    </v-data-table>

    <!-- DIALOG -->
    <v-dialog v-model="dialog" width="50%" :retain-focus="false">
      <v-card>
        <v-card-title>Why are you rejecting?</v-card-title>
        <v-card-text>
          <v-textarea hint="Reason" v-model="reason"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn @click="reject(editedItem)" color="error">Reject</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ManagePatientsRequestsTab',

  data: () => ({
    dialog: false,
    reason: '',
    search: '',
    editedItem: null,
    headers: [
      { text: 'Email', value: 'email' },
      { text: 'First name', value: 'firstName' },
      { text: 'Last name', value: 'lastName' },
      { text: 'Jmbg', value: 'jmbg' },
      { text: 'City', value: 'city' },
      { text: 'Country', value: 'country' },
      { text: 'Address', value: 'address' },
      { text: 'Phone number', value: 'phoneNumber' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),

  methods: {
    ...mapActions('patientRequests', {
      getPatientRequestsAction: 'getPatientRequestsAction',
      confirmPatientRequestAction: 'confirmPatientRequestAction',
      rejectPatientRequestAction: 'rejectPatientRequestAction',
    }),

    openDialog(item){
      this.dialog = true;
      this.editedItem = item;
    },

    approve(item) {
      this.confirmPatientRequestAction(item.email);
    },

    reject(item) {
      this.rejectPatientRequestAction({
        email: item.email,
        reason: this.reason
      });
      this.cancel();
    },
    
    cancel() {
      this.reason = '';
      this.dialog = false;
    },
  },
  async created() {
    await this.getPatientRequestsAction();
  },

  computed: {
    ...mapGetters('patientRequests', {
      getPatientRequests: 'getPatientRequests',
    }),
  },
};
</script>

<style></style>
