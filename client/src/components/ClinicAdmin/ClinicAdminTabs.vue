<template>
  <div>
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#basicInfo`">basic info</v-tab>
      <v-tab :href="`#freeApointments`">free apointments</v-tab>
      <v-tab :href="`#doctors`">doctors</v-tab>
      <v-tab :href="`#nurses`">nurses</v-tab>
      <v-tab :href="`#rooms`">rooms</v-tab>
      <v-tab :href="`#priceLists`">Price Lists</v-tab>
      <v-tab :href="`#requestedAppointments`">Requested Appointments</v-tab>
      <v-tab :href="`#report`">report</v-tab>
      <v-tab :href="`#leaveRequests`">leave requests</v-tab>

      <v-tab-item :value="'basicInfo'">
        <BasicInfo />
      </v-tab-item>
      <v-tab-item :value="'freeApointments'">
        <ManageFreeAppointments />
      </v-tab-item>
      <v-tab-item :value="'doctors'">
        <ManageDoctors />
      </v-tab-item>
      <v-tab-item :value="'nurses'">
        <ManageNurses />
      </v-tab-item>
      <v-tab-item :value="'rooms'">
        <ManageRooms />
      </v-tab-item>
      <v-tab-item :value="'priceLists'">
        <ManagePriceLists />
      </v-tab-item>
      <v-tab-item :value="'requestedAppointments'">
        <ManageRequestedAppointments />
      </v-tab-item>
      <v-tab-item :value="'report'">
        <Report/>
      </v-tab-item>
      <v-tab-item :value="'leaveRequests'">
        <ManageLeaveRequests/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import BasicInfo from "./BasicInfoTab/BasicInfo";
import ManageDoctors from "./DoctorsTab/ManageDoctors";
import ManageNurses from "./NursesTab/ManageNurses";
import ManageRooms from "./RoomsTab/ManageRooms";
import ManageFreeAppointments from "./AppointmentsTab/ManageFreeAppointments";
import ManagePriceLists from './PriceListsTab/ManagePriceLists'
import ManageRequestedAppointments from './RequestedAppointmentsTab/ManageRequestedAppointments'
import ManageLeaveRequests from "./LeaveRequestsTab/ManageLeaveRequests";
import Report from "./ReportTab/Report";
// import ManageAppointmentTypes from "./AppointmentTypesTab/ManageAppointmentTypes";
import { mapActions } from "vuex";
export default {
  name: "ClinicProfile",
  components: {
    BasicInfo,
    ManageDoctors,
    ManageNurses,
    ManageRooms,
    ManageFreeAppointments,
    ManagePriceLists,
    ManageRequestedAppointments,
    ManageLeaveRequests,
    Report
  },
  data: () => ({
    tab: null,
  }),

  methods: {
    ...mapActions({}),
  },

  created() {},
};
</script>

<style></style>
