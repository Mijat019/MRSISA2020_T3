<template>
  <v-app>
    <Toolbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Snackbar />
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from "@/components/global/Toolbar";
import Footer from "@/components/global/Footer";
import Snackbar from "./components/global/MySnackbar";
export default {
  name: "App",

  components: {
    Toolbar,
    Footer,
    Snackbar
  },

  data: () => ({})
};
</script>
