<template>
  <div class="home">
    <NavigationDrawer />
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationDrawer from "@/components/global/NavigationDrawer";

export default {
  name: "MainComponent",
  components: {
    NavigationDrawer,
  },
};
</script>
