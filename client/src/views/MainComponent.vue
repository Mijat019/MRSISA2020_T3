<template>
  <div>
    <Toolbar />
    <NavigationDrawer />
    <v-container fluid>
      <v-row>
        <v-col>
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavigationDrawer from "@/components/global/NavigationDrawer";
import Toolbar from "@/components/global/Toolbar";

export default {
  name: "MainComponent",
  components: {
    NavigationDrawer,
    Toolbar
  }
};
</script>
