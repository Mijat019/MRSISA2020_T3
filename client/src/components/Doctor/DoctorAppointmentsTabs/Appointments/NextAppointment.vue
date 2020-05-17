<template>
  <v-card>
    <div v-if="patientInformation">
      <v-card-title>
        Next appointment
        <v-spacer />
        <v-card-actions>
          <v-btn color="error">Skip</v-btn>
          <v-btn color="primary">Start</v-btn>
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
                  <v-list-item
                    :key="information.title"
                    v-for="information in appointmentInformation"
                  >
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
    </div>
    <div v-else>kurcina</div>
  </v-card>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "NextAppointment",

  data: () => ({}),

  methods: {
    ...mapActions("confirmedAppointments", {
      getUnfinishedConfirmedAppointmentsAction:
        "getUnfinishedConfirmedAppointmentsAction"
    })
  },

  computed: {
    ...mapGetters({
      getUnfinishedConfirmedAppointments:
        "confirmedAppointments/getUnfinishedConfirmedAppointments",
      getUser: "authentication/getUser"
    }),

    patientInformation() {
      const {
        patient: medicalRecord
      } = this.getUnfinishedConfirmedAppointments[0];
      if (!medicalRecord) {
        return null;
      }

      return [
        {
          icon: "mdi-account",
          title: "First name",
          subtitle: medicalRecord.user.firstName
        },
        {
          icon: "mdi-account",
          title: "Last name",
          subtitle: medicalRecord.user.lastName
        },
        {
          icon: "mdi-email",
          title: "Email",
          subtitle: medicalRecord.user.email
        },
        {
          icon: "mdi-cellphone",
          title: "Phone number",
          subtitle: medicalRecord.user.phoneNumber
        },
        {
          icon: "mdi-human-male-height",
          title: "Height",
          subtitle: medicalRecord.height || "Not provided"
        },
        {
          icon: "mdi-weight-kilogram",
          title: "Weight",
          subtitle: medicalRecord.weight || "Not provided"
        },
        {
          icon: "mdi-blood-bag",
          title: "Blood type",
          subtitle: medicalRecord.bloodType || "Not provided"
        }
      ];
    },

    appointmentInformation() {
      const appointment = this.getUnfinishedConfirmedAppointments[0];
      if (!appointment) {
        return null;
      }

      return [
        {
          icon: "mdi-clipboard-text",
          title: "Appointment type",
          subtitle: appointment.priceList.appointmentType.name
        },
        { icon: "mdi-door", title: "Room", subtitle: appointment.room.name },
        {
          icon: "mdi-clock",
          title: "Appointment starts at",
          subtitle: moment().format("Do MMM YYYY LT")
        }
      ];
    }
  },

  async created() {
    await this.getUnfinishedConfirmedAppointmentsAction(this.getUser.id);
    console.log(this.getUnfinishedConfirmedAppointments);
  }
};
</script>

<style>
</style>