<template>
  <v-app-bar dark dense app>
    <v-toolbar-title>Covid19Clinic</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="onLogout">logout</v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Toolbar",
  data: () => ({}),
  methods: {
    ...mapActions("authentication", { logout: "logout" }),

    onLogout() {
      this.logout();
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>