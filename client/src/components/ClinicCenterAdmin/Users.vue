<template>
  <div>
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#requests`">Patient requests</v-tab>
      <v-tab :href="`#clinicAdmins`">Clinic admins</v-tab>
      <v-tab :href="`#clinicCenterAdmins`">Clinic center admins</v-tab>

      <v-tab-item :value="'requests'">patients</v-tab-item>
      <v-tab-item :value="'clinicAdmins'">clinic admins</v-tab-item>
      <v-tab-item :value="'clinicCenterAdmins'">
        clinic center admins</v-tab-item
      >
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: "Users",
  data: () => ({
    tab: null,
  }),
};
</script>

<style></style>
