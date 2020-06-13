<template>
  <v-card>
    <v-card-title>Operation requests</v-card-title>
    <v-card-text>
      <OperationRequestDialog
        v-if="clickedOperationRequest.showDialog"
        v-model="clickedOperationRequest"
      />
      <v-data-table :headers="headers" :items="getOperationRequests">
        <template v-slot:item.actions="{item}">
          <v-btn @click="clickedOperationRequest = {showDialog: true, item}" small icon>
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import OperationRequestDialog from './OperationRequestDialog.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { OperationRequestDialog },

  name: 'ManageOperationRequests',

  data: () => ({
    clickedOperationRequest: {
      showDialog: false,
      item: {
        doctorIds: [],
      },
    },
    headers: [
      { text: 'Doctor', value: 'doctor' },
      { text: 'Patient', value: 'patient' },
      { text: 'Start', value: 'time' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),

  computed: {
    ...mapGetters({
      getOperationRequests: 'operationRequests/getOperationRequests',
      getUser: 'authentication/getUser',
    }),
  },

  methods: {
    ...mapActions({
      getOperationRequestsAction:
        'operationRequests/getOperationRequestsAction',
    }),
  },

  created() {
    this.getOperationRequestsAction(this.getUser.clinicId);
  },
};
</script>

<style>
</style>