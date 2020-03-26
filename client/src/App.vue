<template>
  <v-app>
    <Toolbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from "@/components/global/Toolbar";
import Footer from "@/components/global/Footer";
export default {
  name: "App",

  components: {
    Toolbar,
    Footer
  },

  data: () => ({})
};
</script>
