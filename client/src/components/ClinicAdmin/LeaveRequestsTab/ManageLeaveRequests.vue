<template>
  <v-card>
    <v-card-title>
      Leave requests
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="requests" :search="search">
      <template #item.period="{ item }">{{item.from}} - {{item.to}}</template>
      <template #item.employee="{ item }">{{item.employee.firstName}} {{item.employee.lastName}}</template>
      <template #item.status="{ item }">
          <v-chip :color="statusColor[item.status]" dark>{{ item.status }}</v-chip>
      </template>
      <template v-slot:item.actions="{item}">
        <div v-if="item.status === 'Pending'">
          <!-- Approve button -->
          <v-btn color="success" @click="approve(item)" small>
            Approve
          </v-btn> 
          <!-- Deny Dialog -->
          <v-dialog v-model="dialogDeny" width="50%" @click:outside="cancel">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="error" small>Deny</v-btn>
            </template>
            <v-card>
              <v-card-title>Why was the leave request denied?</v-card-title>
              <v-card-text>
                <v-textarea hint="Reason" v-model="reason"></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancel">Cancel</v-btn>
                <v-btn @click="deny(item)" color="error">Deny</v-btn>
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
import moment from "moment";
export default {

  data: () => ({
    dialogDeny: false,
    reason: "",
    search: "",
    headers: [
        {
            text: "Employee",
            value: "employee"
        },
        {
            text: "Period",
            value: "period"
        },
        {
            text: "Status",
            value: "status"
        },
        {
            text: "Actions",
            value: "actions"
        }
    ],
    statusColor: {
        "Pending": "orange",
        "Approved": "green",
        "Denied": "red"
    }
  }),

  methods: {
    ...mapActions("leaveRequests", {
      getClinicRequestsAction: "getClinicRequestsAction",
      approveAction: "approveRequestAction",
      denyAction: "denyRequestAction"
    }),

    approve(item) {
      this.approveAction(item.id);
    },

    deny(item) {
      this.denyAction({ id: item.id, reason: this.reason });
      this.cancel();
    },

    cancel() {
      this.reason = "";
      this.dialogDeny = false;
    }
  },

  mounted() {
    this.getClinicRequestsAction(this.user.clinicId);
  },

  computed: {
    ...mapGetters({
      unixRequests: "leaveRequests/getRequests",
      user: "authentication/getUser"
    }),

    requests() {
        this.unixRequests.forEach(element => {
            element.from = moment(element.from * 1000).format("DD.MM.YYYY");
            element.to = moment(element.to * 1000).format("DD.MM.YYYY");
        });
        return this.unixRequests;
    }
  }
};
</script>

<style>
</style>