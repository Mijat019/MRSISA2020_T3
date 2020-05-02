<template>
  <div>
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#drugs`">drugs</v-tab>
      <v-tab :href="`#diagnosis`">diagnosis</v-tab>

      <v-tab-item :value="'drugs'">drugs</v-tab-item>
      <v-tab-item :value="'diagnosis'">diagnosis</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: "SifarnikTabs",
  data: () => ({
    tab: null
  })
};
</script>

<style></style>
