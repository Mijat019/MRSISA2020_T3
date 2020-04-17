<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from "./components/global/MySnackbar";
import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    Snackbar
  },

  data: () => ({}),

  methods: {
    ...mapActions({ verifyTokenAction: "authentication/verifyTokenAction" })
  },
  async created() {
    await this.verifyTokenAction();
  }
};
</script>
