<template>
  <v-app>
    <NavigationDrawer />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Snackbar />
  </v-app>
</template>

<script>
import NavigationDrawer from "@/components/global/NavigationDrawer";
import Snackbar from "./components/global/MySnackbar";
export default {
  name: "App",

  components: {
    NavigationDrawer,
    Snackbar
  },

  data: () => ({})
};
</script>
