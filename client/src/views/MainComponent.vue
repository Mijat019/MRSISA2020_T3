<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <NavigationDrawer />
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavigationDrawer from "@/components/global/NavigationDrawer";

export default {
  name: "MainComponent",
  components: {
    NavigationDrawer
  }
};
</script>
