<template>
  <div>
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#requests`">Patient requests</v-tab>
      <v-tab :href="`#clinicAdmins`">Clinic admins</v-tab>
      <v-tab :href="`#clinicCenterAdmins`">Clinic center admins</v-tab>

      <v-tab-item :value="'requests'">
        <ManagePatientRequests />
      </v-tab-item>
      <v-tab-item :value="'clinicAdmins'">
        <ManageClinicAdmins />
      </v-tab-item>
      <v-tab-item :value="'clinicCenterAdmins'">clinic center admins</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import ManageClinicAdmins from "./ManageClinicAdmins/ManageClinicAdmins";
import ManagePatientRequests from "./ManagePatientsRequests";
export default {
  name: "Administration",
  components: { ManageClinicAdmins, ManagePatientRequests },
  data: () => ({
    tab: null
  })
};
</script>

<style></style>
