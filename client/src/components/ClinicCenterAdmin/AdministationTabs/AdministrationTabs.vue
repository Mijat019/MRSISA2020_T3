<template>
  <div>
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#requests`">Patient requests</v-tab>
      <v-tab :href="`#clinicAdmins`">Clinic admins</v-tab>
      <v-tab :href="`#clinicCenterAdmins`">Clinic center admins</v-tab>

      <v-tab-item :value="'requests'">
        <ManagePatientsRequestsTab />
      </v-tab-item>
      <v-tab-item :value="'clinicAdmins'">
        <ManageClinicAdmins />
      </v-tab-item>
      <v-tab-item :value="'clinicCenterAdmins'">
        <ManageClinicCenterAdmins />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import ManageClinicAdmins from "./ManageClinicAdmins/ManageClinicAdmins";
import ManagePatientsRequestsTab from "./ManagePatientsRequestsTab";
import ManageClinicCenterAdmins from "./ManageClinicCenterAdmins/ManageClinicCenterAdmins";
export default {
  name: "AdministrationTabs",
  components: {
    ManageClinicAdmins,
    ManagePatientsRequestsTab,
    ManageClinicCenterAdmins
  },
  data: () => ({
    tab: null
  })
};
</script>

<style></style>
