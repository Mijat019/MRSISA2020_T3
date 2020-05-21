<template>
  <v-card>
    <v-card-title>
      Next appointment
      <v-spacer />
      <v-card-actions>
        <v-btn>Skip</v-btn>
        <v-btn @click="setShowComponent(`appointmentReport`)" color="primary">Start</v-btn>
      </v-card-actions>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Patient information</v-card-title>
            <v-card-text>
              <hr />
              <v-list dense>
                <v-list-item :key="information.title" v-for="information in patientInformation">
                  <v-list-item-avatar>
                    <v-icon>{{ information.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ information.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ information.subtitle }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Appointment information</v-card-title>
            <v-card-text>
              <hr />
              <v-list dense>
                <v-list-item :key="information.title" v-for="information in appointmentInformation">
                  <v-list-item-avatar>
                    <v-icon>{{ information.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ information.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ information.subtitle }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "NextAppointment",

  data: () => ({}),

  methods: {
    ...mapMutations({ setShowComponent: "appointmentReport/setShowComponent" })
  },

  computed: {
    ...mapGetters({
      getNextAppointment: "appointmentReport/getNextAppointment"
    }),

    patientInformation() {
      const { patient } = this.getNextAppointment;
      return [
        {
          icon: "mdi-account",
          title: "First name",
          subtitle: patient?.user.firstName
        },
        {
          icon: "mdi-account",
          title: "Last name",
          subtitle: patient?.user.lastName
        },
        {
          icon: "mdi-email",
          title: "Email",
          subtitle: patient?.user.email
        },
        {
          icon: "mdi-cellphone",
          title: "Phone number",
          subtitle: patient?.user.phoneNumber
        },
        {
          icon: "mdi-human-male-height",
          title: "Height",
          subtitle: patient?.height || "Not provided"
        },
        {
          icon: "mdi-weight-kilogram",
          title: "Weight",
          subtitle: patient?.weight || "Not provided"
        },
        {
          icon: "mdi-blood-bag",
          title: "Blood type",
          subtitle: patient?.bloodType || "Not provided"
        }
      ];
    },

    appointmentInformation() {
      return [
        {
          icon: "mdi-clipboard-text",
          title: "Appointment type",
          subtitle: this.getNextAppointment?.priceList.appointmentType.name
        },
        {
          icon: "mdi-door",
          title: "Room",
          subtitle: this.getNextAppointment?.room.name
        },
        {
          icon: "mdi-clock",
          title: "Appointment starts at",
          subtitle: moment
            .unix(this.getNextAppointment?.start)
            .format("Do MMM YYYY LT")
        }
      ];
    }
  }
};
</script>

<style>
</style>