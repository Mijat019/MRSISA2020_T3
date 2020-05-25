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
      <v-card class="fill-height">
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
export default {
  name: "BasicInfo",

  props: ["user"],

  methods: {},

  computed: {
    personalInformation() {
      return [
        {
          icon: "mdi-account",
          title: "First name",
          subtitle: this.user.firstName
        },
        {
          icon: "mdi-account",
          title: "Last name",
          subtitle: this.user.lastName
        },
        { icon: "mdi-flag", title: "Country", subtitle: this.user.country },
        { icon: "mdi-city", title: "City", subtitle: this.user.city },
        {
          icon: "mdi-card-account-details",
          title: "Address",
          subtitle: this.user.address
        },
        { icon: "mdi-email", title: "Email", subtitle: this.user.email },
        {
          icon: "mdi-cellphone",
          title: "Phone number",
          subtitle: this.user.phoneNumber
        }
      ];
    },

    medicalInformation() {
      return [
        {
          icon: "mdi-human-male-height",
          title: "Height",
          subtitle: this.user.medicalRecord.height || "Not provided"
        },
        {
          icon: "mdi-weight-kilogram",
          title: "Weight",
          subtitle: this.user.medicalRecord.weight || "Not provided"
        },
        {
          icon: "mdi-blood-bag",
          title: "Blood type",
          subtitle: this.user.medicalRecord.bloodType || "Not provided"
        }
      ];
    }
  }
};
</script>

<style>
</style>