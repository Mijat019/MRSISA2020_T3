<template>
  <div>
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#drugs`">drugs</v-tab>
      <v-tab :href="`#diagnosis`">diagnosis</v-tab>

      <v-tab-item :value="'drugs'">
        <ManageDrugs />
      </v-tab-item>
      <v-tab-item :value="'diagnosis'">diagnosis</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import ManageDrugs from "./Drugs/ManageDrugs";
export default {
  name: "SifarnikTabs",
  components: {
    ManageDrugs
  },
  data: () => ({
    tab: null
  })
};
</script>

<style></style>
