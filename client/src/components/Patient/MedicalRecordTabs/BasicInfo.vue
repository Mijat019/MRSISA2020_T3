<template>
  <v-row class="pa-2">
    <v-col>
      <v-card>
        <v-card-title>Personal information</v-card-title>
        <v-card-text>
          <hr />
          <v-list dense>
            <v-list-item :key="information.title" v-for="information in personalInformation">
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
        <v-card-title>Medical information</v-card-title>
        <v-card-text>
          <hr />

          <v-list dense>
            <v-list-item :key="information.title" v-for="information in medicalInformation">
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
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BasicInfo",

  methods: {},

  computed: {
    ...mapGetters({
      getUser: "authentication/getUser",
      getFullName: "authentication/getFullName"
    }),

    personalInformation() {
      return [
        { icon: "mdi-account", title: "Full name", subtitle: this.getFullName },
        { icon: "mdi-flag", title: "Country", subtitle: this.getUser.country },
        { icon: "mdi-city", title: "City", subtitle: this.getUser.city },
        {
          icon: "mdi-card-account-details",
          title: "Address",
          subtitle: this.getUser.address
        },
        { icon: "mdi-email", title: "Email", subtitle: this.getUser.email },
        {
          icon: "mdi-cellphone",
          title: "Phone number",
          subtitle: this.getUser.phoneNumber
        }
      ];
    },

    medicalInformation() {
      return [
        {
          icon: "mdi-human-male-height",
          title: "Height",
          subtitle: this.getUser.medicalRecord.height || "Not provided"
        },
        {
          icon: "mdi-weight-kilogram",
          title: "Weight",
          subtitle: this.getUser.medicalRecord.weight || "Not provided"
        },
        {
          icon: "mdi-blood-bag",
          title: "Blood type",
          subtitle: this.getUser.medicalRecord.bloodType || "Not provided"
        }
      ];
    }
  }
};
</script>

<style>
</style>