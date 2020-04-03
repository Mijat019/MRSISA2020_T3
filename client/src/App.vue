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

export default {
  name: "App",

  components: {
    Snackbar,
  },

  data: () => ({}),
};
</script>
