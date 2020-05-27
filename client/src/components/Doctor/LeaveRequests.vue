<template>
  <div>
      <v-row>
          <v-col>
              <v-card>
                <v-card-title>Request leave</v-card-title>
                
                <v-card-text>
                    <v-form>
                        Choose date range
                        <v-date-picker v-model="dates" range no-title :min="tomorrowDate">
                        </v-date-picker>
                    </v-form>

                </v-card-text>

                <v-card-actions>
                    <v-btn v-if="dates.length == 2" color="primary" @click="sendRequest">Send request</v-btn>
                </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="9">
            <v-card>
                <v-card-title>Request history</v-card-title>
                <v-card-text>
                    <v-data-table
                        :headers="headers"
                        :items="requests"
                    >
                        <template #item.period="{ item }">{{item.from}} - {{item.to}}</template>
                        <template #item.status="{ item }">
                            <v-chip :color="statusColor[item.status]" dark>{{ item.status }}</v-chip>
                        </template>

                    </v-data-table>
                </v-card-text>
            </v-card>
            
          </v-col>
      </v-row>
    

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  name: "LeaveRequests",

  data() {
      return {
          dates: [],
          headers: [
              {
                  text: "Period",
                  value: "period"
              },
              {
                  text: "Status",
                  value: "status"
              }
          ],
          statusColor: {
              "Pending": "orange",
              "Approved": "green",
              "Denied": "red"
          }
      } 
  },

  mounted() {
      this.getUserRequestsAction(this.user.id);
  },

  methods: {
      ...mapActions({
          getUserRequestsAction: "leaveRequests/getUserRequestsAction",
          sendRequestAction: "leaveRequests/sendRequestAction"
      }),
      sendRequest() {
          const from = moment(this.dates[0]).unix();
          const to = moment(this.dates[1]).unix();
          console.log({from, to});
          this.sendRequestAction({
              userId: this.user.id,
              from,
              to
          });
      }
  },

  computed: {
      ...mapGetters({
          user: "authentication/getUser",
          requests: "leaveRequests/getRequests",
          currentDate: "time/getCurrentDateISO"
      }),
      tomorrowDate() {
          let date = new Date();
          date.setDate(date.getDate() + 1);
          return date.toISOString().slice(0, 10);
      }
  }
};
</script>

<style>
</style>