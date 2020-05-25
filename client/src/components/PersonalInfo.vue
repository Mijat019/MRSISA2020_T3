<template>
  <v-card>
    <v-card-title>Personal information</v-card-title>
    <v-card-text>
      <hr />
      <v-list dense>
        <v-form v-model="formValid">
          <v-list-item :key="information.title" v-for="information in personalInfo">
            <v-list-item-avatar>
              <v-icon>{{ information.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ information.title }}</v-list-item-title>
              <v-text-field v-model="user[information.field]" :readonly="information.readonly" :rules="fieldRules"></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-form>

        <v-list-item v-if="formValid">
            <v-list-item-content>
              <v-btn @click="changeInfo" color="primary" max-width="70">Save</v-btn>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PersonalInfo",
  
  props: ["user"],
  
  data() {
    return {
      fieldRules: [
        v => !!v || "Required"
      ],
      formValid: false
    }
  },

  methods: {
    ...mapActions({ 
      changeAction: "authentication/changeInfoAction"
    }),
    changeInfo() {
      this.changeAction(this.user);
    }
  },

  computed: {
    personalInfo() {
      return [
        {
          icon: "mdi-account",
          title: "First name",
          field: "firstName"
        },
        {
          icon: "mdi-account",
          title: "Last name",
          field: "lastName"
        },
        { 
          icon: "mdi-flag", 
          title: "Country", 
          field: "country"
        },
        { 
          icon: "mdi-city", 
          title: "City", 
          field: "city" 
        },
        {
          icon: "mdi-card-account-details",
          title: "Address",
          field: "address"
        },
        { 
          icon: "mdi-email", 
          title: "Email", 
          field: "email",
          readonly: true
        },
        {
          icon: "mdi-cellphone",
          title: "Phone number",
          field: "phoneNumber"
        }
      ]
    }
  }
};
</script>

<style>
</style>